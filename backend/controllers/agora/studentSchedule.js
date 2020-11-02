const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const scheduleModel = require("../../models/database/schedule")
const moment = require('moment');


/**
 * This fn is for get StudentSchedule
 */
const studentAgoraSchedule = (req) => new Promise((resolve, reject) => {
    const BatchIds = []
    const userBatches = req.user.userMetaData.Student.courses
    userBatches.forEach(batch => {
        BatchIds.push(batch.batchId._id)
    });

    var start = moment.utc().startOf('day');
    var end = moment.utc().endOf('day');
    const filter = { batchId: BatchIds, sourceType: "Agora", dateTime: { '$gte': start, '$lte': end } };
    if (req.query.courseId) { filter.courseId = req.query.courseId }
    if (req.query.moduleId) { filter.moduleId = req.query.moduleId }
    if (req.query.chapterId) { filter.chapterId = req.query.chapterId }
    if (req.query.batchId) { filter.batchId = req.query.batchId }
    scheduleModel.find(filter)
        // scheduleModel.find({ batchId: BatchIds, sourceType: "Agora", dateTime: { '$gte': start, '$lte': end } })
        .then(schedule => {
            const response = {
                status: statusCode.Success,
                message: 'Student all Schedule fetch success!',
                data: schedule,
            }
            resolve(response);
        })
        .catch(studentScheduleErr => {
            logger.error(`studentSchedule - error getting the students ${studentScheduleErr}`);
            reject(internalError)
        })
});

module.exports = {
    studentAgoraSchedule
}