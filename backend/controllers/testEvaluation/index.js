const _ = require("lodash");
const logger = require("../../lib/logger");
const studentsTestSolutionModel = require("../../models/database/studentsTestSolution");
const testQuestionModel = require("../../models/database/testQuestion");
const { statusCode, internalError } = require("../../lib/constant");

const validateBody = (body) => {
  if (!body.testId) {
    throw new Error("testId not found");
  }
  if (!body.batchId) {
    throw new Error("batchId not found");
  }
  return true;
};

/**
 * @param {Object} body
 */
const addDataToStudentsTestSolutionsCollection = (body) =>
  new Promise((resolve, reject) => {
    const studentsSolutionTestDetails = {
      testId: body.testId,
      batchId: body.batchId,
      studentUserId: body.studentUserId,
      studentId: body.studentId,
      questions: body.questions,
      totalMarks: body.totalMarks,
      score: body.score,
    };
    studentsTestSolutionModel
      .addMultiple([studentsSolutionTestDetails])
      .then((result) => {
        logger.info(
          `addDataToStudentsTestSolutionsCollection - test solutions data added successfully for studentId ${body.studentUserId}`
        );
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `addDataToStudentsTestSolutionsCollection - error:${JSON.stringify(
            error,
            null,
            2
          )}`
        );
        reject(error);
      });
  });

/**
 * @param {Object} body
 */
const fetchTeachersSolutions = (body) =>
  new Promise((resolve, reject) => {
    testQuestionModel
      .find({ _id: body.testId })
      .then((teachersSolutions) => {
        logger.info(`fetchTeachersSolutions - fetching test successfull.`);
        body.totalMarks = teachersSolutions[0].totalMarks;
        resolve({ body, teachersSolutions });
      })
      .catch((err) => {
        logger.error(
          `fetchTeachersSolutions - error getting the teachers test ${err}`
        );
        reject(internalError);
      });
  });

/**
 * @param {Object} teachersSolutions
 */
const teacherQuestionIdSolutionsMap = (teachersSolutions) => {
  let correctAnswerMap = {};
  let maximumMarksMap = {};
  let questions = teachersSolutions[0].questions;
  questions.forEach((correctSolution) => {
    correctAnswerMap[correctSolution.qId] = correctSolution.correctAnswer;
    maximumMarksMap[correctSolution.qId] = correctSolution.marks;
  });

  return { correctAnswerMap, maximumMarksMap };
};

/**
 * @param {Object} questionsSolutions
 */
const calculateStudentsScore = (questionsSolutions) =>
  new Promise((resolve, reject) => {
    let { body, teachersSolutions } = questionsSolutions;
    let { correctAnswerMap, maximumMarksMap } = teacherQuestionIdSolutionsMap(
      teachersSolutions
    );
    let studentsSolutions = body.questions;
    let score = 0;
    studentsSolutions.forEach((solution) => {
      if (solution.markedAnswer == correctAnswerMap[solution.qId]) {
        score = score + parseInt(maximumMarksMap[solution.qId]);
      }
    });
    body.score = score;
    resolve(body);
  });

/**
 * @param {Object} req
 */
const saveStudentsTestSolutions = (req) =>
  new Promise((resolve, reject) => {
    let { body } = req;
    let studentUserId = req.user._id;
    let studentId = req.user.userMetaData.Student._id;
    body.studentUserId = studentUserId;
    body.studentId = studentId;
    try {
      validateBody(body);
      fetchTeachersSolutions(body)
        .then(calculateStudentsScore)
        .then(addDataToStudentsTestSolutionsCollection)
        .then((result) => {
          logger.info(
            `saveStudentsTestSolutions - Students test solutions saved successful and score calculated.`
          );
          resolve({
            status: statusCode.Success,
            message: "Successfully added tests solutions and score calculated.",
          });
        })
        .catch((error) => {
          const errObj = {
            status: statusCode.InvalidData,
            message: error.message,
          };
          reject(errObj);
        });
    } catch (e) {
      logger.error(
        `saveStudentsTestSolutions - error while parsing the body ${e}`
      );
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const validateQuery = (query) => {
  if (!query.testId) {
    throw new Error("testId not found");
  }
  if (!query.batchId) {
    throw new Error("batchId not found");
  }
};

const formatScores = (scores) => {
  const scoreList = [];
  scores.forEach((score) => {
    score.student = {
      _id: score.studentId._id,
      name: score.studentId.name,
    };
    delete score.studentId;
    scoreList.push(score);
  });
  return scoreList;
};

const getScoresForTests = (query) =>
  new Promise((resolve, reject) => {
    try {
      validateQuery(query);
      studentsTestSolutionModel
        .find({ batchId: query.batchId, testId: query.testId })
        .then((scores) => {
          if (!scores) {
            reject({
              status: statusCode.InvalidData,
              message: "scores not found",
            });
          } else {
            const allScores = formatScores(scores);
            const response = {
              status: statusCode.Success,
              message: "scores fetch success!",
              data: allScores,
            };
            resolve(response);
          }
        })
        .catch((err) => {
          logger.error(`getScoresForTests - error getting the batch ${err}`);
          reject(internalError);
        });
    } catch (e) {
      logger.error(`getScoresForTests - error ${e}`);
      reject({
        status: statusCode.InvalidData,
        message: e.message,
      });
    }
  });

const validateStudentsTestScoreBody = (body) => {
  if (!body.testId) {
    throw new Error("testId not found");
  }
  if (!body.batchId) {
    throw new Error("batchId not found");
  }
  return true;
};

//get student's particular test score batch wise and test wise.
/**
 * @param {Object} req
 */
const getStudentsTestScore = (req) =>
  new Promise((resolve, reject) => {
    let { query } = req;
    try {
      validateStudentsTestScoreBody(query);
      studentsTestSolutionModel
        .find({
          batchId: query.batchId,
          testId: query.testId,
          studentUserId: req.user._id,
        })
        .then((result) => {
          logger.info(`getStudentsTestScore - Students test score retriving.`);
          resolve({
            status: statusCode.Success,
            message: "Successfully retrived students test score.",
            data: result,
          });
        })
        .catch((error) => {
          const errObj = {
            status: statusCode.InvalidData,
            message: error.message,
          };
          reject(errObj);
        });
    } catch (e) {
      logger.error(`getStudentsTestScore - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

module.exports = {
  saveStudentsTestSolutions,
  getScoresForTests,
  getStudentsTestScore,
};
