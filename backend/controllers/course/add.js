const _ = require('lodash');
const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const { statusCode, internalError } = require("../../lib/constant");
const boardModel = require("../../models/database/board")
const gradeModel = require("../../models/database/grade")
const examModel = require("../../models/database/exam")

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (req) => {
    // if (_.get(req, 'user.userMetaData.teacherInterview.status') !== 'APPROVED') { throw new Error("Teacher interview form has not approved yet"); }
    const { body } = req;
    if (!body.name) { throw new Error("name not found"); }
    // if (!body.gradeCode) { throw new Error("grade not found"); }
    // if (!body.boardCode) { throw new Error("board not found"); }
    if (!body.subjectName) { throw new Error("subject not found"); }
    if (!body.introduction) { throw new Error("introduction not found"); }
    return true;
};

/**
 *  
 * @param {Object} grade 
 * @param {Object} board 
 */
const validateData = (role, grade, board) => {
    if (!grade) { new Error("grade out of system") }
    if (!board) { new Error("board out of system") }
    return true;
}

/**
 * This fn is to fetch data for course
 * @param {Object} body
 */

const fetchDataForAddCourse = (body) => new Promise((resolve, reject) => {
    const process = [
        gradeModel.findOne({ code: body.gradeCode }),
        boardModel.findOne({ code: body.boardCode })
    ];
    if (body.examCode) {
        process.push(examModel.findOne({ code: body.examCode }))
    }
    Promise.all(process)
        .then((processResult) => {
            try {
                const [grade, board, exam] = processResult;
                validateData(grade, board);
                body.grade = grade;
                body.board = board;
                body.exam = exam ? exam : '';
                resolve(body);
            } catch (error) {
                logger.error(`fetchDataForAddCourse - error ${error}`);
                reject({
                    status: statusCode.InvalidData,
                    message: error.message
                });
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataForAddCourse - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});

/**
 * This fn is to add course to course collection
 * @param {Object} body
 */
const addDataToCourseCollection = (body) => new Promise((resolve, reject) => {
    const courseDetails = {
        teacherUserId: body.userId,
        teacherId: body.teacherId,
        name: body.name,
        // gradeId: body.grade._id,
        // boardId: body.board._id,
        subjectName: body.subjectName,
        introduction: body.introduction,
    };
    if (body.exam) { courseDetails.examId = body.exam._id }
    courseModel
        .addMultiple([courseDetails])
        .then((courseResult) => {
            logger.info(`addDataToCourseCollection - course data added successfully`);
            resolve(courseResult);
        })
        .catch((courseError) => {
            logger.error(
                `addDataToCourseCollection - error:${JSON.stringify(
                    courseError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});


/**
 * This fn is to add course into db
 */
const addCourse = (req) => new Promise((resolve, reject) => {
    const { body } = req;
    try {
        body.userId = req.user._id;
        body.teacherId = req.user.userMetaData._id;
        validateBody(req);
        addDataToCourseCollection(body)
            .then(result => {
                logger.info(`addCourse - course addition successful`);
                resolve({
                    status: statusCode.Success,
                    message: 'Successfully added course',
                });
            })
            .catch(error => reject(error))

    } catch (e) {
        logger.error(`addCourse - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})


module.exports = {
    addCourse,
}