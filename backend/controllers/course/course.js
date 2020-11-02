const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const { statusCode, internalError } = require("../../lib/constant");

const validateQuery= (query) =>{
    if (!query.courseId) { throw new Error('courseId not found') }
    if (query.courseId.length != 24) { throw new Error('courseId invalid') }

}

const formatCourseDetails = (course) => {
    delete course.teacherUserId.password;
    course.teacherUserId.userMetaData = course.teacherId;
    delete course.teacherId;
    course.teacher = course.teacherUserId
    delete course.teacherUserId;
    return course;
}
/**
 * This function is to get the course data
 * @param {Object} params 
 */
const getCourse = (query) => new Promise((resolve, reject) => {
    try {
        validateQuery(query);
        courseModel.find({ _id: query.courseId })
            .then((course) => {
                if (!course.length) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "Course doesnot exist"
                    })
                }
                else {
                    course = formatCourseDetails(course[0]);
                    const response = {
                        status: statusCode.Success,
                        message: 'Course fetch success!',
                        data: course,
                    }
                    resolve(response);
                }
            })
            .catch(err => {
                logger.error(`getCourse - error getting the Courses ${err}`);
                reject(internalError)
            })
    }
    catch (e) {
        logger.error(`getCourse - error ${e}`)
        reject({
            status: statusCode.InvalidData,
            message: e.message
        })
    }
});

module.exports = {
    getCourse,
}

