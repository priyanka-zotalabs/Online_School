const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const { statusCode, internalError } = require("../../lib/constant");


const formatTeacherCourseDetails = (courses) => {
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
 * This function is to get course data of a teacher
 * @param {Object} params 
 */
const getTeacherCourses = (req) => new Promise((resolve, reject) => {
    let filter = { teacherUserId: req.user._id };
    if (req.query.status === 'PENDING') {
        filter.status = 'PENDING'
    } else if (req.query.status === 'APPROVED') {
        filter.status = 'APPROVED'
    } else if (req.query.status === 'REJECTED') {
        filter.status = 'REJECTED'
    } else if (req.query.status === 'APPROVED/REJECTED'
        || req.query.status === 'REJECTED/APPROVED') {
        filter.status = { $in: ['REJECTED', 'APPROVED'] }
    }
    courseModel.find(filter)
        .then(courses => {
            courses = formatTeacherCourseDetails(courses);
            const response = {
                status: statusCode.Success,
                message: 'Courses fetch success!',
                data: courses,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getTeacherCourses - error getting the Courses ${err}`);
            reject(internalError)
        })
});

module.exports = {
    getTeacherCourses,
}