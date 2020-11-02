const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const { statusCode, internalError } = require("../../lib/constant");

const validateQuery = (query) => {
  if (!query.courseId) {
    throw new Error("courseId not found");
  }
  if (query.courseId.length != 24) {
    throw new Error("courseId invalid");
  }
};

const formatCourseDetails = (course) => {
  delete course.teacherUserId.password;
  course.teacherUserId.userMetaData = course.teacherId;
  delete course.teacherId;
  course.teacher = course.teacherUserId;
  delete course.teacherUserId;
  return course;
};

/**
 * This function is to get the course data
 * @param {Object} params
 */
const getCourse = (query) =>
  new Promise((resolve, reject) => {
    try {
      validateQuery(query);
      courseModulesModel
        .find({ _id: query.courseId, isActive: true })
        .then((course) => {
          if (!course.length) {
            reject({
              status: statusCode.InvalidData,
              message: "Course doesnot exist",
            });
          } else {
            course = formatCourseDetails(course[0]);
            const response = {
              status: statusCode.Success,
              message: "Course fetch success!",
              data: course,
            };
            resolve(response);
          }
        })
        .catch((err) => {
          logger.error(`getCourse - error getting the Courses ${err}`);
          reject(internalError);
        });
    } catch (e) {
      logger.error(`getCourse - error ${e}`);
      reject({
        status: statusCode.InvalidData,
        message: e.message,
      });
    }
  });

const formatCourseDetailsList = (courses) => {
  const coursesDetails = [];
  courses.forEach((course) => {
    console.log(course);
    delete course.teacherUserId.password;
    course.teacherUserId.userMetaData = course.teacherId;
    delete course.teacherId;
    course.teacher = course.teacherUserId;
    delete course.teacherUserId;
    coursesDetails.push(course);
  });
  return coursesDetails;
};

/**
 * This function is to get course data of a teacher
 */
const getAllCourse = () =>
  new Promise((resolve, reject) => {
    courseModulesModel
      .find({ isActive: true })
      .then((courses) => {
        const allCourses = formatCourseDetailsList(courses);
        const response = {
          status: statusCode.Success,
          message: "Courses fetch success!",
          data: allCourses,
        };
        resolve(response);
      })
      .catch((err) => {
        logger.error(`getAllCourse - error getting the Courses ${err}`);
        reject(internalError);
      });
  });

module.exports = {
  getCourse,
  getAllCourse,
};