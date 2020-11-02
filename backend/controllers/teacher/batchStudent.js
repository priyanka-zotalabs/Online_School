const _ = require("lodash");
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const batchModel = require("../../models/database/batch");



const teacherBatchWiseStudent = (teacherId) => new Promise((resolve, reject) => {

    batchModel
        .batchIsFirstInstallmentPaidStudent(
            { 'teachers.teacherId': teacherId },
        )
        .then((result) => {
            const allBatches = result
            const BatchWiseStudentData = []

            allBatches
                .forEach(batch => {


                    var batchStudent = batch.students;
                    const BatchStudent = [];


                    batchStudent
                        .forEach(student => {
                            // if (student.isFirstInstallmentPaid) {
                            //     BatchStudent.push(student)
                            // }

                            BatchStudent.push(student)

                        });

                    var batchData = { batchID: batch._id, batchName: batch.name, students: BatchStudent };
                    BatchWiseStudentData.push(batchData)
                });


            logger.info(`teacherBatchWiseStudent -get teacherBatchWiseStudent`);
            resolve(BatchWiseStudentData);
        })
        .catch((updateError) => {
            logger.error(
                `teacherBatchWiseStudent - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});


const getTeachersBatchWiseStudent = (req) =>
    new Promise((resolve, reject) => {
        logger.info(
            `getTeachersBatchWiseStudent - retriving getTeachersBatchWiseStudent started`
        );
        try {

            const teacherId = req.user.userMetaData.Teacher._id;
            teacherBatchWiseStudent(teacherId)
                .then((result) => {
                    logger.info(
                        `getTeachersBatchWiseStudent - Teachers Batch Wise Student retrival successful`
                    );

                    resolve({
                        status: statusCode.Success,
                        message: "Successfully retrived Batches Wise Teachers for student.",
                        data: result
                    });

                })
                .catch((e) => {

                    logger.error(
                        `getTeachersBatchWiseStudent - error while parsing the body ${e}`
                    );

                    const errObj = {
                        status: statusCode.InvalidData,
                        message: e.message,
                    };
                    reject(errObj);
                });

        } catch (error) {

            logger.error(
                `getTeachersBatchWiseStudent - error while parsing the body ${e}`
            );

            const errObj = {
                status: statusCode.InvalidData,
                message: e.message,
            };

            reject(errObj);
        }
    });

module.exports = {
    getTeachersBatchWiseStudent,
};
