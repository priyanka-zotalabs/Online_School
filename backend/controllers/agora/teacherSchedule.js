const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const scheduleModel = require("../../models/database/schedule")
const moment = require('moment');


/**
 * This fn is for get Teacher teacherSchedule
 */
const teacherAgoraSchedule = (req) => new Promise((resolve, reject) => {
    var start = moment.utc().startOf('day');
    var end = moment.utc().endOf('day');
    const filter = { teacherUserId: req.user._id, sourceType: "Agora", dateTime: { '$gte': start, '$lte': end } };
    if (req.query.courseId) { filter.courseId = req.query.courseId }
    if (req.query.moduleId) { filter.moduleId = req.query.moduleId }
    if (req.query.chapterId) { filter.chapterId = req.query.chapterId }
    if (req.query.batchId) { filter.batchId = req.query.batchId }
    scheduleModel.find(filter)
        .then(schedule => {
            const response = {
                status: statusCode.Success,
                message: 'Teacher all Schedule fetch success!',
                data: schedule,
            }
            resolve(response);
        })
        .catch(teacherScheduleErr => {
            logger.error(`teacherSchedule - error getting the students ${teacherScheduleErr}`);
            reject(internalError)
        })
});


module.exports = {
    teacherAgoraSchedule,
}