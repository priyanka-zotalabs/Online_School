const logger = require("../../lib/logger");
const courseModulesModel = require("../../models/database/courseModules");
const courseRegisterModel = require("../../models/database/courseRegistration");
const { statusCode, internalError } = require("../../lib/constant");
const batchModel = require("../../models/database/batch");



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
    const thisTeacherId = req.user.userMetaData.Teacher._id;
    const process = [
        courseModulesModel.find({ teacherUserId: req.user._id, isActive: true }),
        batchModel.findTeacherCourse({ "teachers.teacherId": thisTeacherId })
    ];
    Promise.all(process)
        .then((processResult) => {
            try {
                const [createdCourses, assignCourses] = processResult;
                const allCourses = []
                if (assignCourses.length) {

                    assignCourses.forEach(course => {

                        const createdCourseResult = createdCourses.find(({ _id }) => _id === course.courseId._id);
                        const allCoursResult = allCourses.find(({ _id }) => _id === course.courseId._id);

                        if (!createdCourseResult && !allCoursResult) {
                            const batchId = course._id
                            course.courseId.batchId = batchId
                            course.courseId.isCreater = false;
                            allCourses.push(course.courseId)

                            // course.isCreater = false;
                            // allCourses.push(course)
                        }


                    });
                }

                if (createdCourses.length) {

                    createdCourses.forEach(course => {
                        course.isCreater = true;
                        allCourses.push(course)

                    });
                }
                const response = {
                    status: statusCode.Success,
                    message: 'Teacher All Courses fetch success!',
                    data: allCourses,
                }
                resolve(response);
            } catch (error) {
                logger.error(`fetchDataToCreate- error ${error}`);
                reject({
                    status: statusCode.InvalidData,
                    message: error.message
                });
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataToJoin - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});

const formatRegisteredStudentDetails = (students) => {
    const studentsDetails = [];
    students.forEach(student => {
        delete student.studentUserId.password;
        student.userMetaData = student.studentUserId;
        delete student.studentUserId;
        studentsDetails.push(student);
    });
    return studentsDetails;
}




/**
 * This function is to get all registered students data
 * @param {Object} params 
 */
const getRegisteredStudents = () => new Promise((resolve, reject) => {
    courseRegisterModel.find({})
        .then(students => {
            const response = {
                status: statusCode.Success,
                message: 'Registered Students fetch success!',
                data: students,
            }
            resolve(response);
        })
        .catch(studentErr => {
            logger.error(`getRegisteredStudents - error getting the students ${studentErr}`);
            reject(internalError)
        })
});

module.exports = {
    getTeacherCourses,
    getRegisteredStudents
}