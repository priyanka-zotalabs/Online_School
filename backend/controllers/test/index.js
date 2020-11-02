const _ = require('lodash');
const logger = require("../../lib/logger");
const testModel = require("../../models/database/test");
const { statusCode, internalError } = require("../../lib/constant");
const moment = require('moment');
const batchModel = require("../../models/database/batch");
const studentsTestSolutionModel = require("../../models/database/studentsTestSolution");
const studentModel = require("../../models/database/student");

const validateBody = (body) => {
    if (!body.testId) { throw new Error("test not found"); }
    if (!body.courseId) { throw new Error("course not found"); }
    if (!body.moduleId) { body.moduleId = "" }
    else if (body.moduleId.length != 24) { throw new Error("module not found"); }
    if (!body.chapterId) { body.chapterId = "" }
    else if (body.chapterId.length != 24) { throw new Error("chapter not found"); }
    if (!body.batchId) { throw new Error("batch not found"); }
    if (!body.startDate) { throw new Error("start date not found"); }
    if (body.dueDate && !body.startTime) { body.startTime = ""; }
    else if (!body.dueDate && body.startTime) { body.dueDate = ""; }
    else if (!body.startTime && !body.dueDate) { throw new Error("start time or due date not found"); }
    return true;
};

const fetchDataForAssignTest = (body) => new Promise((resolve, reject) => {
    testModel.findOne({ testId: body.testId, batchId: body.batchId })
        .then((testResult) => {
            if (testResult) {
                reject({
                    status: statusCode.InvalidData,
                    message: "Test already assigned"
                })
            } else {
                resolve(body);
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataForAssignTest  - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
});

const addDataToTestCollection = (body) => new Promise((resolve, reject) => {
    const testDetails = {
        testId: body.testId,
        courseId: body.courseId,
        moduleId: body.moduleId,
        chapterId: body.chapterId,
        batchId: body.batchId,
        instituteId: body.instituteId,
        startDate: moment(body.startDate).utc(),
    }
    if (body.startTime == "") {
        testDetails.dueDate = moment(body.dueDate).utc()
    } else if (body.dueDate == "") {
        testDetails.startTime = moment(body.startTime).utc()
    }
    testModel
        .addMultiple(testDetails)
        .then((testResult) => {
            logger.info(`addDataToTestCollection - test data added successfully`);
            resolve(testResult);
        })
        .catch((testError) => {
            logger.error(
                `addDataToTestCollection - error:${JSON.stringify(
                    testError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });

})


const assignTest = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req;
        body.instituteId = req.user.instituteId._id;
        validateBody(body);
        fetchDataForAssignTest(body)
            .then(addDataToTestCollection)
            .then(result => {
                logger.info(`assignTest - test addition successful`);
                resolve({
                    status: statusCode.Success,
                    message: 'Successfully added test',
                    data: result
                });
            })
            .catch(error => reject(error))

    } catch (e) {
        logger.error(`createtest - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

const validateQuery = (query) => {
    if (!query.testId) { throw new Error('testId not found') }
    if (query.testId.length != 24) { throw new Error('testId invalid') }

}

const formatAssignTestList = (tests) => {
    let testList = [];
    tests.forEach((test) => {
        test.test = {
            _id: test.testId._id,
            testTitle: test.testId.testTitle
        };
        test.batch = {
            _id: test.batchId._id,
            name: test.batchId.name
        };
        test.course = {
            _id: test.courseId._id,
            name: test.courseId.name
        };
        delete test.testId;
        delete test.batchId;
        delete test.courseId;
        testList.push(test);
    });
    return testList;

}

const getAssignedTest = (query) => new Promise((resolve, reject) => {
    try {
        validateQuery(query);
        testModel.find({ testId: query.testId })
            .then((tests) => {
                if (!tests.length) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "test doesnot exist"
                    })
                }
                else {
                    const allAssignedTests = formatAssignTestList(tests);
                    const response = {
                        status: statusCode.Success,
                        message: 'Assigned test fetch success!',
                        data: allAssignedTests,
                    }
                    resolve(response);
                }
            })
            .catch(err => {
                logger.error(`getAssignedTest - error getting the test ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`getAssignedTest - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
});

const validateBatchQuery = (query) => {
    if (!query.teacherId) { throw new Error('testId not found') }
    if (query.teacherId.length != 24) { throw new Error('testId invalid') }

}

const formatBatchDetailsList = (batches) => {
    let batchesDetails = [];
    batches.forEach((batch) => {
        delete batch.students;
        batch.course = batch.courseId;
        delete batch.courseId;
        batchesDetails.push(batch);
    });
    return batchesDetails;
};

const getBatchesForTeacher = (query) => new Promise((resolve, reject) => {
    try {
        validateBatchQuery(query);
        batchModel.findTeacherBatch({ "teachers.teacherId": query.teacherId })
            .then((batches) => {
                if (!batches.length) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "batch doesnot exist"
                    })
                }
                else {
                    const allBatches = formatBatchDetailsList(batches);
                    const response = {
                        status: statusCode.Success,
                        message: 'batch fetch success!',
                        data: allBatches,
                    }
                    resolve(response);
                }
            })
            .catch(err => {
                logger.error(`getBatchesForTeacher - error getting the test ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`getBatchesForTeacher  - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
});


const formatStudentTestList = (data) => new Promise((resolve, reject) => {
    const tests = data.studentTests;
    let testList = [];
    tests.forEach((test) => {
        test.studentId = data.studentId;
        if (moment(test.startDate).diff(moment(), 'seconds') > 0) {
            test.status = "not started";
            testList.push(test);
            if (tests.length == testList.length) {
                resolve(testList)
            }
        }
        else {
            studentsTestSolutionModel.findOne({ studentId: test.studentId, testId: test._id })
                .then((testResult) => {
                    if (test.dueDate) {
                        if (!testResult && (moment().diff(moment(test.dueDate), 'seconds') > 0)) {
                            test.status = "not given";
                        }
                        else if (!testResult && (moment(moment()).isBetween(moment(test.startDate), moment(test.dueDate)))) {
                            test.status = "live";
                        }
                        else if (testResult) {
                            test.status = "view result";
                        }
                    }
                    else if (test.startTime) {
                        const endTime = moment(test.startTime).add(10, 'm');
                        if (!testResult && (moment().diff(endTime, 'seconds') > 0)) {
                            test.status = "not given";
                        }
                        else if (!testResult && (moment().isBetween(moment(startTime), endTime))) {
                            test.status = "live"
                        }
                        else if (testResult) {
                            test.status = "view result";
                        }
                    }
                    testList.push(test);
                    if (tests.length == testList.length) {
                        resolve(testList)
                    }
                })
                .catch((processError) => {
                    logger.error(
                        `formatStudentTestList  - Error occurred in fetching data: ${JSON.stringify(
                            processError,
                            null,
                            2
                        )}`
                    );
                    reject(internalErrorObj);
                });
        }
    });
})

const validateStudentQuery = (query) => {
    if (!query.batchId) { throw new Error('batchId not found') }
}

// const fetchFeeStatusFromBatch = (query) => new Promise((resolve, reject) => {
//     batchModel.find({ _id: { $in: query.batchId } })
//         .then((results) => {
//             if (!results.length) {
//                 reject({
//                     status: statusCode.InvalidData,
//                     message: "batch doesnot exist"
//                 })
//             }
//             else {
//                 let studentIsFirstInstallmentPaidBatches = [];
//                 results.forEach(result => {
//                     let batchStudent = result.students;
//                     batchStudent.forEach(student => {
//                         if (student.studentId._id == query.studentId && student.isFirstInstallmentPaid) {
//                             studentIsFirstInstallmentPaidBatches.push(result._id)
//                         }
//                     });
//                 });
//                 if (!studentIsFirstInstallmentPaidBatches.length) {
//                     reject({
//                         status: statusCode.InvalidData,
//                         message: "batch doesnot exist with insatllment paid"
//                     })
//                 }
//                 else {
//                     const response = {
//                         studentId: query.studentId,
//                         batches: studentIsFirstInstallmentPaidBatches
//                     }
//                     resolve(response)
//                 }
//             }
//         })
//         .catch((updateError) => {
//             logger.error(
//                 `fetchFeeStatusFromBatch - error:${JSON.stringify(
//                     updateError,
//                     null,
//                     2
//                 )}`
//             );
//             reject(internalError);
//         });
// })

const fetchStudentTest = (query) => new Promise((resolve, reject) => {
    testModel.findTest(query.batchId)
        .then((tests) => {
            if (!tests.length) {
                reject({
                    status: statusCode.InvalidData,
                    message: "test doesnot exist"
                })
            }
            else {
                const studentTestDetails = {
                    studentId: query.studentId,
                    studentTests: tests
                }
                resolve(studentTestDetails)
            }
        })
        .catch(err => {
            logger.error(`fetchTestsForBatch - error getting the test ${err}`);
            reject(internalError);
        })
})

const getStudentTests = (query) => new Promise((resolve, reject) => {
    try {
        validateStudentQuery(query);
        fetchStudentTest(query)
            .then(formatStudentTestList)
            .then((allTests) => {
                logger.info(`getStudentTests -get student tests Whose First Installment is Paid`);
                const response = {
                    status: statusCode.Success,
                    message: 'Test fetch success!',
                    data: allTests,
                }
                resolve(response);
            })
            .catch(err => {
                logger.error(`getStudentTests - error getting the test ${err}`);
                reject(err)
            })
    }
    catch (e) {
        logger.error(`getStudentTests - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
});

const formatBatchDetails = (data) => {
    const studentId = data._id;
    let batchList = [];
    data.courses.forEach((course) => {
        batchList.push(course.batchId)
    })
    return ({
        batchId: batchList,
        studentUserId: studentId
    });
}

const formatStudentTestListForAdmin = (data) => new Promise((resolve, reject) => {
    const tests = data.studentTests;
    let testList = [];
    tests.forEach((test) => {
        delete test.batchId;
        delete test.courseId;
        delete test.chapterId;
        delete test.moduleId;
        test.testDetails = {
            testId: test.testId._id,
            testTitle: test.testId.testTitle
        }
        delete test.testId;
        test.studentId = data.studentUserId;
        if (moment(test.startDate).diff(moment(), 'seconds') > 0) {
            test.status = "scheduled";
            testList.push(test);
            if (tests.length == testList.length) {
                resolve(testList)
            }
        }
        else {
            studentsTestSolutionModel.findOne({ studentId: test.studentId, testId: test.testDetails.testId })
                .then((testResult) => {
                    if (test.dueDate) {
                        if (!testResult && (moment().diff(moment(test.dueDate), 'seconds') > 0)) {
                            test.status = "not appeared";
                        }
                        else if (!testResult && (moment(moment()).isBetween(moment(test.startDate), moment(test.dueDate)))) {
                            test.status = "ongoing";
                        }
                        else if (testResult) {
                            test.status = "appeared"
                        }
                    }
                    else if (test.startTime) {
                        let endTime = moment(test.startTime).add(10, 'm');
                        if (!testResult && (moment().diff(endTime, 'seconds') > 0)) {
                            test.status = "not appeared";
                        }
                        else if (!testResult && (moment().isBetween(moment(startTime), endTime))) {
                            test.status = "ongoing"
                        }
                        else if (testResult) {
                            test.status = "appeared"
                        }
                    }
                    testList.push(test);
                    if (tests.length == testList.length) {
                        resolve(testList)
                    }
                })
                .catch((processError) => {
                    logger.error(
                        `formatStudentTestListForAdmin  - Error occurred in fetching data: ${JSON.stringify(
                            processError,
                            null,
                            2
                        )}`
                    );
                    reject(internalErrorObj);
                });
        }
    });
})


const getStudentTestDetails = (req) => new Promise((resolve, reject) => {
    try {
        const { query } = req;
        studentModel.findOne({ _id: query.studentId })
            .then((result) => {
                if (!result) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "student doesnot exist"
                    })
                }
                else {
                    const allBatches = formatBatchDetails(result);
                    testModel.findTest(allBatches.batchId)
                        .then((tests) => {
                            if (!tests.length) {
                                reject({
                                    status: statusCode.InvalidData,
                                    message: "test doesnot exist"
                                })
                            }
                            else {
                                const studentTestDetails = {
                                    studentUserId: allBatches.studentUserId,
                                    studentTests: tests
                                }
                                formatStudentTestListForAdmin(studentTestDetails)
                                    .then((allTests) => {
                                        const response = {
                                            status: statusCode.Success,
                                            message: 'Test fetch success!',
                                            data: allTests,
                                        }
                                        resolve(response);
                                    })
                            }
                        })
                        .catch(err => {
                            logger.error(`getStudentTestDetails - error getting the test ${err}`);
                            reject(internalError)
                        })
                }
            })
    }
    catch (e) {
        logger.error(`getStudentTestDetails - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
})

module.exports = {
    assignTest,
    getAssignedTest,
    getBatchesForTeacher,
    getStudentTests,
    getStudentTestDetails

}