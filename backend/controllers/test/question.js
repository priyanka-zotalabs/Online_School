const _ = require('lodash');
const logger = require("../../lib/logger");
const questionModel = require("../../models/database/testQuestion");
const { statusCode, internalError } = require("../../lib/constant");
var randomstring = require("randomstring");


const validateBody = (body) => {
    if (!body.testTitle) { throw new Error("test title not found"); }
    if (!body.testDescription) { throw new Error("test description not found"); }
    if (!body.totalQuestions) { throw new Error("total number of questions not found"); }
    if (!body.totalTime) { throw new Error("total time not found"); }
    if (!body.subject) { throw new Error("subject not found"); }
    if (!body.questions) { throw new Error("questions not found"); }
}

const addDataToQuestionCollection = (body) => new Promise((resolve, reject) => {
    try {
        testQuestions = body.questions;
        marksArray = [];
        questionList = [];
        testQuestions.forEach((questions) => {
            let id = randomstring.generate({ length: 12, charset: "alphabetic", });
            questionObj = {
                qId: id,
                question: questions.question,
                numberOfOptions: questions.numberOfOptions,
                marks: questions.marks,
                options: questions.options,
                correctAnswer: questions.correctAnswer,
                explanation: questions.explanation,
            }
            marksArray.push(questions.marks)
            questionList.push(questionObj);
        })

        var totalMarks = marksArray.reduce((a, b) => (+a) + (+b), 0)
        const questionDetails = {
            teacherId: body.teacherId,
            instituteId: body.instituteId,
            testTitle: body.testTitle,
            testDescription: body.testDescription,
            totalQuestions: body.totalQuestions,
            totalTime: body.totalTime,
            subject: body.subject,
            questions: questionList,
            totalMarks: totalMarks
        }

        questionModel.addMultiple([questionDetails])
            .then((questionResult) => {
                logger.info(`addDataToQuestionCollection - question data added successfully`);
                resolve(questionResult);
            })
            .catch((questionError) => {
                logger.error(
                    `addDataToQuestionCollection - error:${JSON.stringify(
                        questionError,
                        null,
                        2
                    )}`
                );
                reject(internalError);
            });
    }
    catch (e) {
        logger.error(`addDataToQuestionCollection - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})


const createTestQuestions = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req;
        body.teacherId = req.user.userMetaData.Teacher._id;
        body.instituteId = req.user.instituteId._id;
        validateBody(body);
        addDataToQuestionCollection(body)
            .then(result => {
                logger.info(`createTestQuestions - test addition successful`);
                resolve({
                    status: statusCode.Success,
                    message: 'Successfully added questions',
                });
            })
            .catch(error => reject(error))
    }
    catch (e) {
        logger.error(`createtest - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }

})

const getAllTest = (req) => new Promise((resolve, reject) => {
    questionModel.find({ teacherId: req.user.userMetaData.Teacher._id })
        .then(tests => {
            const response = {
                status: statusCode.Success,
                message: 'Tests fetch success!',
                data: tests,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getAllTest - error getting the tests ${err}`);
            reject(internalError)
        })
});

const validateQuery = (query) => {
    if (!query.testId) { throw new Error('testId not found') }
    if (query.testId.length != 24) { throw new Error('testId invalid') }

}

const getTest = (query) => new Promise((resolve, reject) => {
    try {
        validateQuery(query);
        questionModel.findOne({ _id: query.testId })
            .then((test) => {
                if (!test) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "test doesnot exist"
                    })
                }
                else {
                    const response = {
                        status: statusCode.Success,
                        message: 'test fetch success!',
                        data: test,
                    }
                    resolve(response);
                }
            })
            .catch(err => {
                logger.error(`getTest - error getting the test ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`getTest - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
});




const deleteTest = (query) => new Promise((resolve, reject) => {
    try {
        validateQuery(query);
        questionModel.findOne({ _id: query.testId })
            .then((test) => {
                if (!test) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "test doesnot exist"
                    })
                }
                else {
                    questionModel.deleteOne({ _id: query.testId })
                        .then((deleteResult) => {
                            logger.info(`deleteTest - test deleted successfully`);
                            resolve({
                                status: statusCode.Success,
                                message: 'Successfully deleted test',
                            });
                        })
                }
            })
            .catch(err => {
                logger.error(`deleteTest - error deleting the test  ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`deletetest - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }

})

const validateQuestionBody = (body) => {
    if (!body.testId) { throw new Error("test id not found"); }
    if (!body.qId) { throw new Error("question id not found"); }
    if (!body.question) { throw new Error("question not found"); }
    if (!body.numberOfOptions) { throw new Error("number of options not found"); }
    if (!body.options) { throw new Error("options not found"); }
    if (!body.marks) { throw new Error("marks not found"); }
    if (!body.correctAnswer) { throw new Error("correct answer not found"); }
    if (!body.explanation) { throw new Error("explanation not found"); }
}

const updateQuestion = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req
        validateQuestionBody(body);
        questionModel.findOne({ _id: body.testId, "questions.qId": body.qId })
            .then((result) => {
                if (!result) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "question doesnot exist"
                    })
                }
                else {
                    const questionDetails = {
                        qId: body.qId,
                        question: body.question,
                        numberOfOptions: body.numberOfOptions,
                        marks: body.marks,
                        options: body.options,
                        correctAnswer: body.correctAnswer,
                        explanation: body.explanation,
                    }
                    questionModel.updateQuestion({ _id: body.testId, "questions.qId": body.qId }, questionDetails)
                        .then((updateResult) => {
                            logger.info(`updateQuestion - question updated successfully`);
                            resolve({
                                status: statusCode.Success,
                                message: 'Successfully updated question',
                            });
                        })
                }
            })
            .catch(err => {
                logger.error(`deleteQuestion - error deleting the test question ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`deletetest - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

const validateDeleteQuery = (query) => {
    if (!query.testId) { throw new Error("test title not found"); }
    if (!query.qId) { throw new Error("test title not found"); }
}

const deleteQuestion = (query) => new Promise((resolve, reject) => {
    try {
        validateDeleteQuery(query);
        questionModel.findOne({ _id: query.testId, "questions.qId": query.qId })
            .then((result) => {
                if (!result) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "question doesnot exist"
                    })
                }
                else {
                    questionModel.deleteQuestion({ _id: query.testId }, { qId: query.qId })
                        .then((deleteResult) => {
                            logger.info(`deleteQuestion - test deleted successfully`);
                            resolve({
                                status: statusCode.Success,
                                message: 'Successfully deleted question',
                            });
                        })
                }
            })
            .catch(err => {
                logger.error(`deleteQuestion - error deleting the test question ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`deleteQuestion - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

const validateUpdateBody = (body) => {
    if (!body.testId) { throw new Error("test id not found"); }
    if (!body.testTitle) { throw new Error("test title not found"); }
    if (!body.testDescription) { throw new Error("test decription not found"); }
    if (!body.totalTime) { throw new Error("total time not found"); }
}

const updateTestDetails = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req
        validateUpdateBody(body);
        questionModel.findOne({ _id: body.testId })
            .then((result) => {
                if (!result) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "test doesnot exist"
                    })
                }
                else {
                    const questionDetails = {
                        testTitle: body.testTitle,
                        testDescription: body.testDescription,
                        totalTime: body.totalTime,
                    }
                    questionModel.update({ _id: body.testId }, questionDetails)
                        .then((updateResult) => {
                            logger.info(`updateTestDetails - question details updated successfully`);
                            resolve({
                                status: statusCode.Success,
                                message: 'Successfully updated test details',
                            });
                        })
                }
            })
            .catch(err => {
                logger.error(`updateTestDetails - error updating the test details ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`updateTestDetails - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

const formatTestDetailsList = (tests) => {
    let testDetails = [];
    tests.forEach((test) => {
        delete test.questions;
        testDetails.push(test);
    });
    return testDetails;
};

const getInstituteTests = (req) => new Promise((resolve, reject) => {
    try {
        const instituteId = req.user.instituteId._id;
        questionModel.findInstituteTest({ instituteId: instituteId })
            .then((tests) => {
                if (!tests.length) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "test doesnot exist"
                    })
                }
                else {
                    const allTests = formatTestDetailsList(tests);
                    const response = {
                        status: statusCode.Success,
                        message: 'Test fetch success!',
                        data: allTests,
                    }
                    resolve(response);
                }
            })
            .catch(err => {
                logger.error(`getInstituteTests - error getting the test ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`getInstituteTests - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
})



module.exports = {
    createTestQuestions,
    getAllTest,
    deleteTest,
    getTest,
    updateQuestion,
    deleteQuestion,
    updateTestDetails,
    getInstituteTests

}