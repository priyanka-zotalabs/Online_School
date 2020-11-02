const courseModulesModel = require('../../models/database/courseModules')
const zoomTokenModel = require('../../models/database/zoomToken')
const logger = require('../../lib/logger');
const moment = require('moment');
const { statusCode, internalError } = require('../../lib/constant');
const request = require('request');
const rp = require("request-promise");

const validateCreateScheduleForChapterBody = (body) => {
    if (!body.courseId) { throw new Error('courseId required') }
    if (!body.moduleId) { throw new Error('moduleId required') }
    if (!body.chapterId) { throw new Error('chapterId required') }
    if (!body.dateTime) { throw new Error('dateTime required') }
    if (!moment(body.dateTime).isValid()) { throw new Error("dateTime not valid"); }
    if (!moment(body.dateTime).utc().isAfter()) { throw new Error("dateTime should not be in past"); }
    // if (!body.scheduleType) { throw new Error('scheduleType required') }
    return true;

};

const validateFetchedData = (courseModules) => {
    if (!courseModules.length) { throw new Error('Course details not found') }
}
const fetchCourseDetails = (body) => new Promise((resolve, reject) => {
    courseModulesModel.find({ _id: body.courseId, 'modules._id': body.moduleId })
        .then((courseModules) => {
            try {
                validateFetchedData(courseModules);
            }
            catch (e) {
                logger.error(`fetchCourseDetails: error ${courseModulesErr}`);
                return reject({ status: statusCode.InvalidData, message: e.message });
            }
            let selectedData = {
                found: false,
                ...courseModules[0],
                modules: []
            };
            courseModules[0].modules.forEach((element, modIndex) => {
                if (element._id === body.moduleId && !selectedData.found) {
                    element.index = modIndex;
                    selectedData.modules.push(element);
                    element.chapters.forEach((chapter, chapIndex) => {
                        if (chapter._id === body.chapterId && !selectedData.found) {
                            chapter.index = chapIndex;
                            selectedData.modules[0].chapters = [chapter];
                            selectedData.found = true;
                        }
                    });
                }
            });
            if (!selectedData.found) {
                logger.error(`fetchCourseDetails: error ${courseModulesErr}`);
                reject({ status: statusCode.InvalidData, message: 'Course details not found' });
            } else {
                resolve({ body, selectedData });
            }
        })
        .catch((courseModulesErr) => {
            logger.error(`fetchCourseDetails: error ${courseModulesErr}`);
            reject(internalError);
        })
})

const validateTokenDetails = (data) => {
    if (!data.access_token) { throw new Error('access token not found') }
    if (!data.token_type) { throw new Error('token type not found') }
    if (!data.refresh_token) { throw new Error('refresh token not found') }
    if (!data.expires_in) { throw new Error('expire time not found') }
    if (!data.scope) { throw new Error('scope not found') }
    return true;

}

const addFirstToken = (body) => new Promise((resolve, reject) => {
    try {
        const tokenDetails = {
            access_token: body.access_token,
            token_type: body.token_type,
            refresh_token: body.refresh_token,
            expires_in: body.expires_in,
            scope: body.scope,
            key: "zoom"
        }
        validateTokenDetails(tokenDetails);
        zoomTokenModel.update({ key: tokenDetails.key }, tokenDetails)
            .then((result) => {
                logger.info(`addFirstToken - Token added successfully`);
                const response = {
                    status: statusCode.Success,
                    message: "Token added into DB"
                }
                resolve(response);
            })
            .catch((tokenError) => {
                logger.error(
                    `addFirstToken - error:${JSON.stringify(
                        tokenError,
                        null,
                        2
                    )}`
                );
                reject(internalError);
            });
    }
    catch (error) {
        logger.error(`addFirstToken - error ${error}`);
        reject({
            status: statusCode.InvalidData,
            message: error.message
        });
    }
})

const updateAccessToken = () => new Promise((resolve, reject) => {
    zoomTokenModel.findOne()
        .then((result) => {
            if (!result) {
                reject({
                    status: statusCode.InvalidData,
                    message: "No token found"
                })
            } else {
                refresh_token = result.refresh_token
                const url = `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`;
                request
                    .post(url, (error, response, body) => {
                        console.log(error);

                        // Parse response to JSON
                        body = JSON.parse(body);
                        zoomTokenDetails = {
                            access_token: body.access_token,
                            token_type: body.token_type,
                            refresh_token: body.refresh_token,
                            expires_in: body.expires_in,
                            scope: body.scope,
                        }
                        zoomTokenModel
                            .update({ _id: result._id }, zoomTokenDetails)
                            .then((result) => {
                                logger.info(`newToken - newToken added successfully`);
                                const access_token = zoomTokenDetails.access_token;
                                resolve(access_token);
                            })
                            .catch((error) => {
                                logger.error(
                                    `newToken - error:${JSON.stringify(
                                        error,
                                        null,
                                        2
                                    )}`
                                );
                                reject(internalError);
                            });
                    })
                    .auth(process.env.clientID, process.env.clientSecret);
            }
        })
});


/**
 * This fn is to create the online meeting if course is online
 * @param {*} data 
 */
const scheduleOnlineCourse = (data) => new Promise((resolve, reject) => {
    const zoombody = {
        topic: data.selectedData.modules[0].chapters[0].name,
        agenda: data.selectedData.modules[0].chapters[0].description,
        start_time: data.body.dateTime,
        type: '2',
        // timezone: "UTC"
    }
    updateAccessToken()
        .then(access_token => {
            const token = access_token
            try {
                (async () => {

                    const body = await rp({
                        url: "https://api.zoom.us/v2//users/me/meetings",
                        method: "post",
                        json: zoombody
                    }).auth(null, null, true, token);
                    zoomMeetingDetails = {
                        id: body.id,
                        url: body.join_url
                    }
                    data.body.zoomMeetingDetails = zoomMeetingDetails;
                    resolve(data)
                })()
            } catch (err) {
                res.send(err);
            }

        })
        .catch((error) => {
            logger.error(
                `newToken - error:${JSON.stringify(
                    error,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
})


/**
 * This fn is to add the data to db for schedule
 * @param {*} data 
 */
const addDataToDB = (data) => new Promise((resolve, reject) => {
    const { selectedData, body } = data;
    let obj = {
        dateTime: moment(body.dateTime).utc(),
        meetingId: data.body.zoomMeetingDetails.id,
        url: data.body.zoomMeetingDetails.url
    };
    const indexes = {
        moduleIndex: selectedData.modules[0].index,
        chapterIndex: selectedData.modules[0].chapters[0].index,
    };
    courseModulesModel.addSchedule(
        {
            _id: selectedData._id,
        },
        obj,
        indexes
    )
        .then(scheduleRes => {
            logger.info(`Schedule added success to db`);
            resolve(scheduleRes);
        })
        .catch(scheduleErr => {
            logger.error(`Schedule added Failed to db: ${scheduleErr}`);
            reject(internalError)
        })
})

/**
 * To create the schedule for chapter
 * @param {*} body
 */
const create = (body) => new Promise((resolve, reject) => {
    try {
        validateCreateScheduleForChapterBody(body);
        fetchCourseDetails(body)
            .then(scheduleOnlineCourse)
            .then(addDataToDB)
            .then(res => {
                logger.info(`Schedule added success to db`);
                resolve({
                    status: statusCode.Success,
                    message: 'Meeting scheduled successfully'
                });
            })
            .catch(err => {
                reject(err);
            })
    }
    catch (e) {
        logger.error(`create: error ${courseModulesErr}`);
        reject({ status: statusCode.InvalidData, message: e.message });
    }
})


module.exports = {
    create,
    addFirstToken
}