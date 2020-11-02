const _ = require('lodash');
const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const liveClassModel = require("../../models/database/liveClass")
const internalErrorObj = internalError;
const uuid4 = require('uuid4')
const config = require('../../config/index');
const moment = require('moment')
const emailHelper = require('../../lib/emailHelper');


/**
 * This fn is to validate the approve course body 
 * @param {Object} body
 */
const validateApproveCourseBody = (body) => {
    if (!body.courseId) { throw new Error("course not found"); }
    if (!body.dateTime) { throw new Error("dateTime not found"); }
    if (!moment(body.dateTime).isValid()) { throw new Error("dateTime not valid"); }
    if (!moment(body.dateTime).utc().isAfter()) { throw new Error("dateTime should not be in past"); }
    return true;
};

/**
 * This fn is to fetch data for course approval
 * @param {Object} body
 */
const fetchDataForApproval = (body) => new Promise((resolve, reject) => {
    courseModel.findOne({ _id: body.courseId })
        .then((course) => {
            if (!course) {
                reject({
                    status: statusCode.InvalidData,
                    message: "No course found with this id"
                })
            }
            else {
                body.course = course;
                body.status = "APPROVED";
                resolve(body);
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataForApproval - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
});

/**
 * This fn is to update approved course into db
 */
const updateApproval = (body) => new Promise((resolve, reject) => {
    const updateDetails = {
        status: body.status,
        dateTime: moment(body.dateTime).utc(),
        courseImage: body.courseImage,
        rejectReason: ""
    }
    courseModel
        .update({ _id: body.courseId }, updateDetails)
        .then((updateResult) => {
            logger.info(`updateApproval - course data updated successfully`);
            resolve(body);
        })
        .catch((updateError) => {
            logger.error(
                `updateApproval - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
});

const createMeeting = (body) => new Promise((resolve, reject) => {
    const meetingDetails = {
        teacherUserId: body.course.teacherUserId._id,
        teacherId: body.course.teacherId._id,
        courseId: body.courseId,
        name: body.course.name,
        meetingID: uuid4(),
        attendeePW: config.attendeePW,
        moderatorPW: config.moderatorPW,
        dateTime: moment(body.dateTime).utc(),
    }
    liveClassModel
        .addMultiple([meetingDetails])
        .then((meetingResult) => {
            logger.info(`createMeeting - meeting data added successfully`);
            const userDetails = {
                email: body.course.teacherUserId.email,
                name: body.course.name,
                courseId: body.courseId,
            }
            resolve(userDetails);
        })
        .catch((meetingError) => {
            logger.error(
                `addDataToCourseCollection - error:${JSON.stringify(
                    meetingError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
})

/**
 * This fn is to approve course
 * @param {Object} body
 */
const approveCourse = (body, courseImage) => new Promise((resolve, reject) => {
    try {
        body.courseImage = { ...courseImage }
        validateApproveCourseBody(body);
        fetchDataForApproval(body)
            .then(updateApproval)
            .then(createMeeting)
            .then(emailHelper.courseApprovalEmail)
            .then(result => {
                logger.info(`approveCourse - course approval successful`);
                resolve({
                    status: statusCode.Success,
                    message: 'Successfully approved course, created meeting and email sent',
                });
            })
            .catch(error => reject(error))

    } catch (e) {
        logger.error(`approveCourse - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }

});

/**
 * This fn is to validate the reject course body 
 * @param {Object} body
 */
const validateRejectCourseBody = (body) => {
    if (!body.courseId) { throw new Error("courseId not found"); }
    if (!body.reason) { throw new Error("reject reason not found"); }
    return true;
};

/**
 * This fn is to fetch data for course rejection
 * @param {Object} body
 */
const fetchDataForRejection = (body) => new Promise((resolve, reject) => {
    courseModel.findOne({ _id: body.courseId })
        .then((course) => {
            if (!course) {
                reject({
                    status: statusCode.InvalidData,
                    message: "No course found with this id"
                })
            }
            else {
                body.status = "REJECTED";
                resolve(body);
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataForRejection - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
});

/**
 * This fn is to update rejected course into db
 */
const updateRejection = (body) => new Promise((resolve, reject) => {
    const updateDetails = {
        status: body.status,
        dateTime: "",
        rejectReason: body.reason
    }
    courseModel
        .update({ _id: body.courseId }, updateDetails)
        .then((updateResult) => {
            logger.info(`updateRejection - course rejected successfully`);
            resolve(updateResult);
        })
        .catch((updateError) => {
            logger.error(
                `updateRejection - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
});

/**
 * This fn is to reject course 
 *  @param {Object} body
 */
const rejectCourse = (body) => new Promise((resolve, reject) => {
    try {
        validateRejectCourseBody(body);
        fetchDataForRejection(body)
            .then(updateRejection)
            .then(result => {
                logger.info(`rejectCourse - course rejection successful`);
                resolve({
                    status: statusCode.Success,
                    message: 'Successfully rejected course',
                });
            })
            .catch(error => reject(error))

    } catch (e) {
        logger.error(`rejectCourse - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }


});

module.exports = {
    approveCourse,
    rejectCourse,
}