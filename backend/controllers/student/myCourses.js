const _ = require("lodash");
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const batchModel = require("../../models/database/batch");



const studentBatchesWiseCourse = (studentBatches, currentStudentId) => new Promise((resolve, reject) => {

    batchModel
        .find(
            { _id: studentBatches },
        )
        .then((result) => {
            const allBatches = result
            const studentCourse = []

            allBatches.forEach(batch => {
                var batchStudent = batch.students

                batchStudent.forEach(student => {
                    // if (student.studentId._id == currentStudentId && student.isFirstInstallmentPaid) {
                    //     studentCourse.push(batch.courseId)
                    // }
                    if (student.studentId._id == currentStudentId) {
                        studentCourse.push(batch.courseId)
                    }
                });
            });
            logger.info(`studentBatchesWiseCourse -get studentBatchesWiseCourse`);
            resolve(studentCourse);
        })
        .catch((updateError) => {
            logger.error(
                `studentBatchesWiseCourse - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});


const getStudentCourses = (req) =>
    new Promise((resolve, reject) => {
        logger.info(
            `getStudentCourses - retriving courses for student started`
        );
        try {

            const studentId = req.user.userMetaData.Student._id;
            const studentBatches = []
            const studentCourses = req.user.userMetaData.Student.courses
            studentCourses.forEach(course => {
                studentBatches.push(course.batchId._id,)

            });
            studentBatchesWiseCourse(studentBatches, studentId)
                .then((result) => {
                    logger.info(
                        `getStudentCourses - getStudentCourses retrival successful`
                    );
                    resolve({
                        status: statusCode.Success,
                        message: "Successfully retrived courses for student.",
                        data: result,
                    });
                })
                .catch((e) => {
                    logger.error(
                        `getStudentCourses - error while parsing the body ${e}`
                    );
                    const errObj = {
                        status: statusCode.InvalidData,
                        message: e.message,
                    };
                    reject(errObj);
                });

        } catch (error) {
            logger.error(
                `getStudentCourses - error while parsing the body ${e}`
            );
            const errObj = {
                status: statusCode.InvalidData,
                message: e.message,
            };
            reject(errObj);
        }
    });

module.exports = {
    getStudentCourses,
};
