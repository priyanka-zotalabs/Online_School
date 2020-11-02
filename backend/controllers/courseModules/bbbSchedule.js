const courseModulesModel = require('../../models/database/courseModules')
const zoomTokenModel = require('../../models/database/zoomToken')
const logger = require('../../lib/logger');
const moment = require('moment');
const { statusCode, internalError } = require('../../lib/constant');
const request = require('request');
const rp = require("request-promise");
const _ = require('lodash');
const courseModel = require("../../models/database/course");
const userModel = require("../../models/database/user");
const liveClassModel = require("../../models/database/liveClass")
const internalErrorObj = internalError;
const uuid4 = require('uuid4')
const config = require('../../config/index');
const emailHelper = require('../../lib/emailHelper');
const scheduleModel = require("../../models/database/schedule")


const validateCreateScheduleForChapterBody = (body) => {
    if (!body.batchId) { throw new Error('batchId required') }
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
                // body.data=selectedData;
                // body.chapterName=selectedData.modules[0].chapters[0].name,
                // resolve({ body });
                resolve({ body, selectedData });

            }
        })
        .catch((courseModulesErr) => {
            logger.error(`fetchCourseDetails: error ${courseModulesErr}`);
            reject(internalError);
        })
})





const createMeeting = (data) => new Promise((resolve, reject) => {
    const meetingDetails = {
        sourceType: "BigBlueButton",
        teacherUserId: data.body.teacherUserId,
        teacherId: data.body.teacherId,
        instituteId: data.body.instituteId,
        batchId: data.body.batchId,
        courseId: data.body.courseId,
        moduleId: data.body.moduleId,
        chapterId: data.body.chapterId,
        name: data.selectedData.modules[0].chapters[0].name,
        meetingID: uuid4(),
        attendeePW: config.attendeePW,
        moderatorPW: config.moderatorPW,
        // topic: data.selectedData.modules[0].chapters[0].name,
        // agenda: data.selectedData.modules[0].chapters[0].description,
        // start_time: data.body.dateTime,
        dateTime: moment(data.body.dateTime).utc(),
    }
    scheduleModel
        .addMultiple([meetingDetails])
        .then((meetingResult) => {
            logger.info(`createMeeting - meeting data added successfully`);
            resolve(meetingResult);
        })
        .catch((meetingError) => {
            logger.error(
                `addDataToCourseCollection - error:${JSON.stringify(
                    meetingError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
})




/**
 * To create the schedule for chapter
 * @param {*} body
 */
const bbbSchedule = (body, user) => new Promise((resolve, reject) => {
    try {
        body.teacherUserId = user._id;
        body.teacherId = user.userMetaData.Teacher._id;
        body.instituteId = user.instituteId._id
        validateCreateScheduleForChapterBody(body);
        fetchCourseDetails(body)
            // .then(scheduleOnlineCourse)
            // .then(addDataToDB)
            .then(createMeeting)
            .then(res => {
                logger.info(`Schedule added success to db`);
                resolve({
                    status: statusCode.Success,
                    message: 'Meeting scheduled successfully',
                    data: res
                });
            })
            .catch(err => {
                reject(err);
            })
    }
    catch (e) {
        logger.error(`create: error ${e.message}`);
        reject({ status: statusCode.InvalidData, message: e.message });
    }
})


module.exports = {
    bbbSchedule,
}