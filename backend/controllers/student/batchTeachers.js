const _ = require("lodash");
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const batchModel = require("../../models/database/batch");



const studentBatchesWiseTeachers = (studentBatches, currentStudentId) => new Promise((resolve, reject) => {

    batchModel
        .find(
            { _id: studentBatches },
        )
        .then((result) => {
            const allBatches = result
            const StudentBatcheTeachers = []

            allBatches.forEach(batch => {
                var batchStudent = batch.students

                batchStudent
                    .forEach(student => {
                        // if (student.studentId._id == currentStudentId && student.isFirstInstallmentPaid) {
                        //     var data = { batchId: batch._id, teachers: batch.teachers }
                        //     StudentBatcheTeachers.push(data)
                        // }
                        if (student.studentId._id == currentStudentId) {
                            var data = { batchId: batch._id, teachers: batch.teachers }
                            StudentBatcheTeachers.push(data)
                        }
                    });
            });
            logger.info(`studentBatchesWiseTeachers -get studentBatchesWiseTeachers`);
            resolve(StudentBatcheTeachers);
        })
        .catch((updateError) => {
            logger.error(
                `studentBatchesWiseTeachers - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});


const getStudentAllBatchesTeachers = (req) =>
    new Promise((resolve, reject) => {
        logger.info(
            `getStudentBatchTeachers - retriving getStudentBatchTeachers started`
        );
        try {

            const studentId = req.user.userMetaData.Student._id;
            const studentBatches = []
            const studentCourses = req.user.userMetaData.Student.courses
            studentCourses.forEach(course => {
                studentBatches.push(course.batchId._id,)

            });
            studentBatchesWiseTeachers(studentBatches, studentId)
                .then((result) => {
                    logger.info(
                        `getStudentAllBatchesTeachers - Student Batche Wise Teachers retrival successful`
                    );
                    resolve({
                        status: statusCode.Success,
                        message: "Successfully retrived Batches Wise Teachers for student.",
                        data: result,
                    });
                })
                .catch((e) => {
                    logger.error(
                        `getStudentAllBatchesTeachers - error while parsing the body ${e}`
                    );
                    const errObj = {
                        status: statusCode.InvalidData,
                        message: e.message,
                    };
                    reject(errObj);
                });

        } catch (error) {
            logger.error(
                `getStudentAllBatchesTeachers - error while parsing the body ${e}`
            );
            const errObj = {
                status: statusCode.InvalidData,
                message: e.message,
            };
            reject(errObj);
        }
    });

module.exports = {
    getStudentAllBatchesTeachers,
};
