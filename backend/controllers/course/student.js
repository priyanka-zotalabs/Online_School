const _ = require('lodash');
const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const { statusCode, internalError } = require("../../lib/constant");
const courseRegisterModel = require("../../models/database/courseRegistration")
const moment = require('moment')
const config = require('../../config/index');


const formatUpcomingCourseDetails = (courses) => {
    const coursesDetails = [];
    courses.forEach(course => {
        delete course.teacherUserId.password;
        course.teacherUserId.userMetaData = course.teacherId;
        delete course.teacherId;
        course.teacher = course.teacherUserId
        delete course.teacherUserId;
        coursesDetails.push(course);
    });
    return coursesDetails;
}

/**
 * This fn is to get upcoming courses
 *  @param {Object} body
 */
const upcomingCourses = (req) => new Promise((resolve, reject) => {
    let filter = { status: "APPROVED", dateTime: { $gt: moment().utc() } };
    let process = [courseModel.find(filter)];
    if (_.get(req, 'user.roleId.code') == config.role.STUDENT) {
        studId = req.user.userMetaData._id
        process.push(
            courseRegisterModel.find({ studentId: studId })
        );
    }
    Promise.all(process)
        .then((processResult) => {
            let [courses, courseRegisters] = processResult;
            if (!courseRegisters) { courseRegisters = []; }
            let responseC = _.map(courses, course => {
                isRegistered = _.find(courseRegisters, courseRegister => (courseRegister.courseId._id === course._id))
                if (isRegistered) { course.registered = true };
                return course;
            })
            console.log(responseC);
            responseC = formatUpcomingCourseDetails(responseC);
            const response = {
                status: statusCode.Success,
                message: 'Upcoming courses fetch success!',
                data: responseC,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getUpcomingCourses - error getting the Courses ${err}`);
            reject(internalError)
        })
});


module.exports = {
    upcomingCourses,
}