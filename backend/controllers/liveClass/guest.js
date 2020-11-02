const _ = require('lodash');
const axios = require('axios');
const parser = require('xml2json');
const moment = require('moment');
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const liveClassModel = require("../../models/database/liveClass");
const courseModel = require("../../models/database/course");
const config = require("../../config/index");
const scheduleModel = require("../../models/database/schedule");


/**
 * This function is to validate the query parameter
 */
const validateGuestInfo = (body) => {
    // if (!body.courseId) { throw new Error("courseId not found") }
    // if (body.courseId.length != 24) { throw new Error('courseId invalid') }
    if (!body.name) { throw new Error("name not found") }
}

/**
 * This function is to validate the data fetched from db
 */
// const validateData = (course, schedule) => {
//     if (!course) { throw new Error("course not found") }
//     if (!schedule) { throw new Error("schedule not found") }
//     const date = moment(course.dateTime)
//     const start = moment(date).subtract(5, 'm');
//     const end = moment(date).add(2, 'h');
//     if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
//     return true;
// }

// const validateData = (schedule, course, module, chapter, date) => {
//     // if (!course) { throw new Error("course not found") }
//     // if (!module) { throw new Error("module not found") }
//     // if (!chapter) { throw new Error("date not found") }
//     if (!schedule) { throw new Error("schedule not found") }
//     const start = moment(date).subtract(10, 'm');
//     const end = moment(date).add(30, 'm');
//     if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
//     return true;
// }

const validateData = (schedule, date) => {
    // const validateData = (schedule, course, module, chapter, date) => {

    // if (!course) { throw new Error("course not found") }
    // if (!module) { throw new Error("module not found") }
    // if (!chapter) { throw new Error("date not found") }
    if (!schedule) { throw new Error("schedule not found") }
    const start = moment(date).subtract(10, 'm');
    const end = moment(date).add(30, 'm');
    // if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
    return true;
}

/**
 * This function is to fetch data for creating class
 */
const fetchDataToJoin = (data) => new Promise((resolve, reject) => {
    const process = [
        // scheduleModel.findOne({ courseId: data.courseId, moduleId: data.moduleId, chapterId: data.chapterId }),
        scheduleModel.findOne({ _id: data.scheduleId }),
        // courseModulesModel.findOne({ _id: data.courseId }),
        // courseModulesModel.findOne({ _id: data.courseId, 'modules._id': data.moduleId }),
        // courseModulesModel.findOne({ _id: data.courseId, 'modules._id': data.moduleId, 'modules.chapters._id': data.chapterId })
    ];
    Promise.all(process)
        .then((processResult) => {
            try {
                const [schedule] = processResult;
                // resolve({ course, schedule})
                const date = moment(schedule.dateTime)
                validateData( schedule,date);
                // const [schedule, course, module, chapter, date] = processResult;

                // validateData(schedule, course, module, chapter, date);
                // resolve({ chapter, schedule })
                resolve({ schedule })


            } catch (error) {
                logger.error(`fetchDataTojoin- error ${error}`);
                reject({
                    status: statusCode.InvalidData,
                    message: error.message
                });
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataToJoin - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
})

/**
 * This function generates big blue button meeting url
 */
const generateURL = (configuration, apiName) => {
    let paramsArray = [];
    Object.keys(configuration).forEach(info => {
        if (configuration[info]) {
            paramsArray.push(`${info}=${configuration[info]}`)
        }
    });
    let params = paramsArray.join('&');
    const checksum = config.createCheckSum(`${apiName}${params}${config.bigBlueButtonSecretKey}`);
    params += `&checksum=${checksum}`;
    const url = `${config.bigBlueButtonBaseUrl}/${apiName}?${params}`
    return url;

}

/**
 * This function checks meeting status
 */
const checkMeetingStatus = (data) => new Promise((resolve, reject) => {
    const apiName = 'isMeetingRunning';
    const meetingInfo = {
        meetingID: data.schedule.meetingID
    }
    const meetingUrl = generateURL(meetingInfo, apiName);
    axios.get(meetingUrl)
        .then((meet) => {
            logger.info(`createMeeting success`);
            const json = JSON.parse(parser.toJson(meet.data));
            if (json.response.running === 'true') {
                resolve(data)
            } else {
                reject({
                    status: 422,
                    message: 'Class not started yet',
                })
            }
        })
        .catch((meetErr) => {
            logger.info(`createMeeting failed :${meetErr}`);
            reject(internalError)
        });
});

/**
 * This function generates link for live class for student
 * @param {Object} body
 */
const joinAsGuest = (data, body) => {
    logger.info(`joinAsGuest start`)
    const apiName = 'join';
    const joinMeetingAsGuest = {
        meetingID: data.schedule.meetingID,
        fullName: body.name.split(' ').join('+'),
        password: encodeURIComponent(data.schedule.attendeePW),
        redirect: true
    };
    const meetingUrl = generateURL(joinMeetingAsGuest, apiName);
    logger.info(`joinAsGuest success`)
    return meetingUrl;
}

/**
 * This function is for guest for joining class
 * @param {Object} query
 */
const joinGuestClass = (body) => new Promise((resolve, reject) => {
    try {
        validateGuestInfo(body);
        const data = {
            scheduleId: body.scheduleId,
            courseId: body.courseId,
            moduleId: body.moduleId,
            chapterId: body.chapterId,
            name: body.name
        }
        fetchDataToJoin(data)
            .then(checkMeetingStatus)
            .then((result) => {
                const guestUrl = joinAsGuest(result, body)
                resolve({
                    status: 200,
                    message: 'Created successfully',
                    data: { meetingUrl: guestUrl }
                })
            }).
            catch((error) => {
                logger.error(`joinGuestClass - error getting meeting status  ${error}`);
                reject(error)
            });

    } catch (error) {
        logger.error(`joinGuestClass- error ${error}`);
        reject({
            status: statusCode.InvalidData,
            message: error.message
        });
    }
})

module.exports = {
    joinGuestClass,
}
