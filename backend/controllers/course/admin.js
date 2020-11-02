const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const { statusCode, internalError } = require("../../lib/constant");


const formatCourseDetails = (courses) => {
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
 * This function is to get the course data
 * @param {Object} params 
 */
const getCourses = (query) => new Promise((resolve, reject) => {
    let filter = {};
    if (query.status === 'PENDING') {
        filter = { status: 'PENDING' }
    } else if (query.status === 'APPROVED') {
        filter = { status: 'APPROVED' }
    } else if (query.status === 'REJECTED') {
        filter = { status: 'REJECTED' }
    } else if (query.status === 'APPROVED/REJECTED' || query.status === 'REJECTED/APPROVED') {
        filter = { status: { $in: ['REJECTED', 'APPROVED'] } }
    }
    courseModel.find(filter)
        .then(courses => {
            courses = formatCourseDetails(courses);
            const response = {
                status: statusCode.Success,
                message: 'Courses fetch success!',
                data: courses,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getCourses - error getting the Courses ${err}`);
            reject(internalError)
        })
});

module.exports = {
    getCourses,
}