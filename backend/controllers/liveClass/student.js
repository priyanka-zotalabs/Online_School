const _ = require('lodash');
const axios = require('axios');
const parser = require('xml2json');
const moment = require('moment');
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const liveClassModel = require("../../models/database/liveClass");
const courseRegisterModel = require("../../models/database/courseRegistration");
const courseModel = require("../../models/database/course");
const config = require("../../config/index");
const scheduleModel = require("../../models/database/schedule");
const courseModulesModel = require("../../models/database/courseModules");




/**
 * This function is to validate the query parameter
 */
const validateQueryParams = (req) => {
    if (!req.query.courseId) { throw new Error("courseId not found") }
}

/**
 * This function is to validate the data fetched from db
 */
// const validateData = (course, schedule, registeredClass, date) => {
//     if (!course) { throw new Error("course not found") }
//     if (!schedule) { throw new Error("schedule not found") }
//     const start = moment(date).subtract(5, 'm');
//     const end = moment(date).add(2, 'h');
//     if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
//     return true;
// }

const validateData = (schedule, course, module, chapter, date) => {
    if (!course) { throw new Error("course not found") }
    if (!module) { throw new Error("module not found") }
    if (!chapter) { throw new Error("date not found") }
    if (!schedule) { throw new Error("schedule not found") }
    const start = moment(date).subtract(10, 'm');
    const end = moment(date).add(30, 'm');
    if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
    return true;
}

/**
 * This function is to fetch data for creating class
 */
const fetchDataToJoin = (data) => new Promise((resolve, reject) => {
    const process = [
        scheduleModel.findOne({ courseId: data.courseId, moduleId: data.moduleId, chapterId: data.chapterId }),
        courseModulesModel.findOne({ _id: data.courseId }),
        courseModulesModel.findOne({ _id: data.courseId, 'modules._id': data.moduleId }),
        courseModulesModel.findOne({ _id: data.courseId, 'modules._id': data.moduleId, 'modules.chapters._id': data.chapterId })
        // courseRegisterModel.findOne({ courseId: data.courseId, studentId: data.studId })
    ];
    Promise.all(process)
        .then((processResult) => {
            try {
                // const [course, schedule, registeredClass] = processResult;
                // const date = moment(course.dateTime)
                // validateData(course, schedule, registeredClass, date);
                const [schedule, course, module, chapter] = processResult;
                const date = moment(schedule.dateTime)
                validateData(schedule, course, module, chapter, date);
                resolve({ chapter, schedule })
                // resolve({ course, schedule, registeredClass })

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
 * @param {Object} data
 *  * @param {Object} user
 */
const joinAsStudent = (data, user) => {
    logger.info(`joinAsStudent start`)
    const apiName = 'join';
    const joinMeetingAsStudent = {
        meetingID: data.schedule.meetingID,
        fullName: user.userMetaData.name.split(' ').join('+'),
        password: encodeURIComponent(data.schedule.attendeePW),
        redirect: true,
        userID: user._id,
    };
    const meetingUrl = generateURL(joinMeetingAsStudent, apiName);
    logger.info(`joinAsStudent success`)
    return meetingUrl;
}

/**
 * This function is for student for joining class
 * @param {Object} query
 */
const joinClass = (req) => new Promise((resolve, reject) => {
    try {
        validateQueryParams(req);
        const data = {
            courseId: req.query.courseId,
            moduleId: req.query.moduleId,
            chapterId: req.query.chapterId,
            studId: req.user.userMetaData._id
        }
        fetchDataToJoin(data)
            .then(checkMeetingStatus)
            .then((result) => {
                const studentUrl = joinAsStudent(result, req.user)
                resolve({
                    status: 200,
                    message: 'Created successfully',
                    data: { meetingUrl: studentUrl }
                })
            }).
            catch((error) => {
                logger.error(`joinClass - error getting meeting status  ${error}`);
                reject(error)
            });

    } catch (error) {
        logger.error(`joinClass- error ${error}`);
        reject({
            status: statusCode.InvalidData,
            message: error.message
        });
    }
})

module.exports = {
    joinClass,
}
