const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const { statusCode, internalError } = require("../../lib/constant");

const validateQuery = (query) => {
  if (!query.courseId) {
    throw new Error("courseId not found");
  }
};

/**
 * This function is to delete the course
 * @param {Object} query
 */
const deleteCourse = (query) =>
  new Promise((resolve, reject) => {
    try {
      validateQuery(query);
      courseModulesModel
        .find({ _id: query.courseId })
        .then((course) => {
          if (!course.length) {
            reject({
              status: statusCode.InvalidData,
              message: "courseId not found",
            });
          } else {
            courseModulesModel
              .update(
                { _id: query.courseId },
                {
                  isActive: false,
                }
              )
              .then((deleteResult) => {
                const response = {
                  status: statusCode.Success,
                  message: "Delete Course  success!",
                };
                resolve(response);
              });
          }
        })
        .catch((err) => {
          logger.error(`deleteCourse - error delete the Courses ${err}`);
          reject(internalError);
        });
    } catch (e) {
      logger.error(`deleteCourse - error ${e}`);
      reject({
        status: statusCode.InvalidData,
        message: e.message,
      });
    }
  });

module.exports = {
  deleteCourse,
};
