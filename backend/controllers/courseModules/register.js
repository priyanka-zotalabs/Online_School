const _ = require("lodash");
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const liveClassModel = require("../../models/database/liveClass");
const courseRegisterModel = require("../../models/database/courseRegistration");
const internalErrorObj = internalError;
/**
 * This fn is to validate the register course body
 * @param {Object} body
 */
const validateRegisterCourseBody = (body) => {
  if (!body.courseId) {
    throw new Error("course not found");
  }
  return true;
};

/**
 * This fn is to fetch data for course registration
 * @param {Object} body
 */
const fetchDataForRegisterCourse = (body) =>
  new Promise((resolve, reject) => {
    liveClassModel
      .findOne({ courseId: body.courseId })
      .then((liveClass) => {
        if (!liveClass) {
          reject({
            status: statusCode.InvalidData,
            message: "No live class found with this course id",
          });
        } else {
          body.liveClassId = liveClass._id;
          resolve(body);
        }
      })
      .catch((processError) => {
        logger.error(
          `fetchDataForRegisterCourse - Error occurred in fetching data: ${JSON.stringify(
            processError,
            null,
            2
          )}`
        );
        reject(internalErrorObj);
      });
  });

/**
 * This fn is to add register course details  to course registration collection
 * @param {Object} body
 */
const addDataToCourseRegistrationCollection = (body) =>
  new Promise((resolve, reject) => {
    const registerDetails = {
      studentUserId: body.userId,
      studentId: body.studentId,
      courseId: body.courseId,
      // liveClassId: body.liveClassId,
      amount: body.amount + " Euro",
      paymentMethod: body.paymentMethod,
      transaction_id: body.transaction_id,
      name: body.name,
      contactNumber: body.contactNumber || "",
    };
    courseRegisterModel
      .update(
        { courseId: body.courseId, studentId: body.studentId },
        registerDetails
      )
      .then((registerResult) => {
        logger.info(`registerCourse - Course registration successful`);
        resolve(registerResult);
      })
      .catch((registerError) => {
        logger.error(
          `addDataToCourseRegistrationCollection - error:${JSON.stringify(
            registerError,
            null,
            2
          )}`
        );
        reject(internalErrorObj);
      });
  });

/**
 * This fn is to register student for a course
 *  @param {Object} body
 */
const registerCourse = (req) =>
  new Promise((resolve, reject) => {
    const { body } = req;
    try {
      body.userId = req.user._id;
      body.studentId = req.user.userMetaData._id;
      validateRegisterCourseBody(body);
      // fetchDataForRegisterCourse(body)
      //   .then(addDataToCourseRegistrationCollection)
      addDataToCourseRegistrationCollection(body)
        .then((result) => {
          logger.info(`registerCourse - course addition successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully registered for the  course",
          });
        })
        .catch((error) => reject(error));
    } catch (e) {
      logger.error(`registerCourse - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const formatRegisteredCourseDetails = (courses) => {
  const coursesDetails = [];
  courses.forEach((course) => {
    delete course.studentUserId;
    delete course.studentId;
    delete course.courseId.teacherUserId;
    coursesDetails.push(course);
  });
  return coursesDetails;
};

/**
 * This function is to get the registered course data
 * @param {Object} params
 */
const getRegisteredCourses = (req) =>
  new Promise((resolve, reject) => {
    const studentId = req.user.userMetaData._id;
    courseRegisterModel
      .find({ studentId: studentId, isActive: true })
      .then((courses) => {
        courses = formatRegisteredCourseDetails(courses);
        const response = {
          status: statusCode.Success,
          message: "Registered Courses fetch success!",
          data: courses,
        };
        resolve(response);
      })
      .catch((err) => {
        logger.error(`getRegisteredCourses - error getting the Courses ${err}`);
        reject(internalError);
      });
  });

module.exports = {
  registerCourse,
  getRegisteredCourses,
};
