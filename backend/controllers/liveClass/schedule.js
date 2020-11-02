const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const courseRegisterModel = require("../../models/database/courseRegistration");
const { statusCode, internalError } = require("../../lib/constant");
const scheduleModel = require("../../models/database/schedule")
const batchModel = require("../../models/database/batch");




/**
 * This function is to get all schedule
 * @param {Object} params 
 */
const getAllSchedule = () => new Promise((resolve, reject) => {
    scheduleModel.find({})
        .then(schedule => {
            const response = {
                status: statusCode.Success,
                message: 'All Schedule fetch success!',
                data: schedule,
            }
            resolve(response);
        })
        .catch(getAllScheduleErr => {
            logger.error(`getAllSchedule - error getting the students ${getAllScheduleErr}`);
            reject(internalError)
        })
});


/**
 * This fn is for get Teacher teacherSchedule
 */
const teacherSchedule = (req) => new Promise((resolve, reject) => {
    scheduleModel.find({ teacherUserId: req.user._id })
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




const studentBatches = (studentBatches, currentStudentId) => new Promise((resolve, reject) => {
    batchModel
        .find(
            { _id: studentBatches },
        )
        .then((result) => {
            const allBatches = result
            const studentIsFirstInstallmentPaidBatches = []

            allBatches.forEach(batch => {
                var batchStudent = batch.students

                batchStudent.forEach(student => {
                    // if (student.studentId._id == currentStudentId && student.isFirstInstallmentPaid) {
                    //     studentIsFirstInstallmentPaidBatches.push(batch._id)
                    // }
                    if (student.studentId._id == currentStudentId) {
                        studentIsFirstInstallmentPaidBatches.push(batch._id)
                    }
                });
            });
            logger.info(`studentBatches -get student Batches Whose First Installment is Paid`);
            resolve(studentIsFirstInstallmentPaidBatches);
        })
        .catch((updateError) => {
            logger.error(
                `studentBatches - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});


/**
 * This fn is for get StudentSchedule
 */
const studentSchedule = (req) => new Promise((resolve, reject) => {
    const studentId = req.user.userMetaData.Student._id;
    const BatchIds = []
    const userBatches = req.user.userMetaData.Student.courses
    userBatches.forEach(batch => {
        BatchIds.push(batch.batchId._id)
    });
    studentBatches(BatchIds, studentId)
        .then(studentIsFirstInstallmentPaidBatches => {
            scheduleModel.find({ batchId: studentIsFirstInstallmentPaidBatches })
                .then(result => {
                    const response = {
                        status: statusCode.Success,
                        message: 'Student all Schedule fetch success!',
                        data: result,
                    }
                    resolve(response);
                })
        })
        .catch(studentScheduleErr => {
            logger.error(`studentSchedule - error getting the students ${studentScheduleErr}`);
            reject(internalError)
        })
});

/**
 * This fn is for get  instituteSchedule for Admin
 */
const instituteSchedule = (req) => new Promise((resolve, reject) => {
    scheduleModel.find({ instituteId: req.user.instituteId._id, })
        .then(schedule => {
            const response = {
                status: statusCode.Success,
                message: 'Institute all Schedule fetch success!',
                data: schedule,
            }
            resolve(response);
        })
        .catch(instituteScheduleErr => {
            logger.error(`instituteSchedule - error getting the instituteSchedule ${instituteScheduleErr}`);
            reject(internalError)
        })
});

module.exports = {
    getAllSchedule,
    teacherSchedule,
    studentSchedule,
    instituteSchedule,
    // getBatchShedule
}