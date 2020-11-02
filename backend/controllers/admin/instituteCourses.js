const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const courseRegisterModel = require("../../models/database/courseRegistration");
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
 * This function is to get course data of a Institute
 * @param {Object} params 
 */
const getInstituteCourses = (req) => new Promise((resolve, reject) => {
    let filter = { instituteId: req.user.instituteId._id, isActive: true };
    courseModulesModel.find(filter)
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
            logger.error(`getInstituteCourses - error getting the Courses ${err}`);
            reject(internalError)
        })
});

module.exports = {
    getInstituteCourses
}