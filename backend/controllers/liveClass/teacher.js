const _ = require('lodash');
const axios = require('axios');
const parser = require('xml2json');
const moment = require('moment');
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const liveClassModel = require("../../models/database/liveClass");
const courseModulesModel = require("../../models/database/courseModules");
const config = require("../../config/index");
const scheduleModel = require("../../models/database/schedule")



/**
 * This function is to validate the query parameter
 */
const validateQueryParams = (req) => {
    if (!req.query.courseId) { new Error("courseId not found") }
}

/**
 * This function is to validate the data fetched from db
 */
const validateData = (schedule, course, module, chapter, date) => {
    if (!course) { throw new Error("course not found") }
    if (!module) { throw new Error("module not found") }
    if (!chapter) { throw new Error("chapter not found") }
    if (!schedule) { throw new Error("schedule not found") }
    const start = moment(date).subtract(10, 'm');
    const end = moment(date).add(30, 'm');
    if (!(moment().isBetween(start, end))) { throw new Error("Class timing not in range") }
    return true;
}

/**
 * This function is to fetch data for creating class
 */
const fetchDataToCreate = (data) => new Promise((resolve, reject) => {
    const process = [
        scheduleModel.findOne({ _id: data.scheduleId, courseId: data.courseId, moduleId: data.moduleId, chapterId: data.chapterId }),
        courseModulesModel.findOne({ _id: data.courseId }),
        courseModulesModel.findOne({ _id: data.courseId, 'modules._id': data.moduleId }),
        courseModulesModel.findOne({ _id: data.courseId, 'modules._id': data.moduleId, 'modules.chapters._id': data.chapterId })
    ];
    Promise.all(process)
        .then((processResult) => {
            try {
                const [schedule, course, module, chapter] = processResult;
                const date = moment(schedule.dateTime).utc()
                validateData(schedule, course, module, chapter, date);
                resolve({ chapter, schedule })
            } catch (error) {
                logger.error(`fetchDataToCreate- error ${error}`);
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

const createMeeting = (data) => new Promise((resolve, reject) => {
    console.log(`createMeeting start`);
    const apiName = 'create';
    const newMeetingInfo = {
        name: data.schedule.name.split(' ').join('+'),
        meetingID: data.schedule.meetingID,
        attendeePW: encodeURIComponent(data.schedule.attendeePW),
        moderatorPW: encodeURIComponent(data.schedule.moderatorPW),
        welcome: encodeURIComponent(config.classWelcomeMessage),
        maxParticipants: "",
        logoutURL: encodeURIComponent(config.reactAppUrl),
        record: false,
        duration: '',
        moderatorOnlyMessage: config.classModeratorMessage.split(' ').join('+'),
        autoStartRecording: false,
        allowStartStopRecording: false,
        webcamsOnlyForModerator: true,
        logo: "",
        bannerText: config.classBannerMessage.split(' ').join('+'),
        copyright: "",
        muteOnStart: true,
        allowModsToUnmuteUsers: true,
        lockSettingsDisableCam: "",
        lockSettingsDisableMic: "",
        lockSettingsDisablePrivateChat: true,
        lockSettingsDisablePublicChat: "",
        guestPolicy: config.classGuestPolicy,
    };
    const meetingUrl = generateURL(newMeetingInfo, apiName);
    axios.get(meetingUrl)
        .then((meet) => {
            const json = JSON.parse(parser.toJson(meet.data));
            if (json.response.returncode === 'SUCCESS') {
                logger.info(`createMeeting success`);
                resolve(data)
            } else {
                logger.error(`createMeeting failed ${meet}`);
                reject({
                    status: 422,
                    message: 'Meeting creating failed, contact admin',
                });
            }
            resolve(meet);
        })
        .catch((meetErr) => {
            console.log(`createMeeting failed :${meetErr}`);
            reject(internalError)
        });
});

const joinAsModerator = (data, user) => {
    console.log(`joinAsModerator start`);
    const apiName = 'join';
    const joinMeetingAsModerator = {
        meetingID: data.schedule.meetingID,
        fullName: `Teacher ${user.userMetaData.name}`.split(' ').join('+'),
        password: encodeURIComponent(data.schedule.moderatorPW),
        userID: user._id,
        redirect: true,
    };
    const meetingUrl = generateURL(joinMeetingAsModerator, apiName);
    logger.info(`joinAsModerator success`);
    return meetingUrl;
}


const createTeacherClass = (req) => new Promise((resolve, reject) => {
    try {
        validateQueryParams(req);
        const data = {
            scheduleId:req.query.scheduleId,
            courseId: req.query.courseId,
            teachId: req.user.userMetaData._id,
            moduleId: req.query.moduleId,
            chapterId: req.query.chapterId,
        }
        fetchDataToCreate(data)
            .then(createMeeting)
            .then((result) => {
                const moderatorUrl = joinAsModerator(result, req.user);
                resolve({
                    status: 200,
                    message: 'Meeting created successfully',
                    data: { meetingUrl: moderatorUrl }
                })
            })
            .catch((error) => {
                logger.error(`createTeacherClass error: ${error}`);
                resolve(error);
            })
    } catch (error) {
        logger.error(`createTeacherClass- error ${error}`);
        reject({
            status: statusCode.InvalidData,
            message: error.message
        });
    }
})


module.exports = {
    createTeacherClass,
}