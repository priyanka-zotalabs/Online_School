const userModel = require('../../models/database/user');
const teacherModel = require('../../models/database/teacher');
const adminModel = require('../../models/database/admin');
const config = require("../../config/index");
const loginCtrl = require("../user/signIn");



const utils = require('../../lib/utils');


const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');


const formateTeacherDetails = (teachers) => {
    const teachersDetails = [];
    teachers.forEach(teacher => {
        const data = teacher.userId;
        delete data.password;
        delete teacher.userId;
        data.userMetaData = teacher;
        teachersDetails.push(data);
    });
    return teachersDetails;
}

/**
 * This function is to get the teacher data
 * @param {Object} params 
 */
const getTeachers = (req) => new Promise((resolve, reject) => {
    let process;
    // if (params.code) {
    //     process = teacherModel.findOne({ _id: params.teacherID });
    // } else {
    process = teacherModel.find({ instituteId: req.user.instituteId._id });
    // }
    process
        .then(teachers => {
            const teachersDetails = formateTeacherDetails(teachers);
            const response = {
                status: statusCode.Success,
                message: 'teacher fetch success!',
                data: teachersDetails !== null ? teachersDetails : {},
            }
            resolve(response);
        })
        .catch(teacherErr => {
            logger.error(`getteacher - error getting the teachers ${JSON.stringify(teacherErr, null, 2)}`);
            reject(internalError)
        })
});



/**
 * This function is to get All teacher whose status is COMPLETED
 * @param {Object} params 
 */
const instituteTeachers = (req) => new Promise((resolve, reject) => {
    let process;
    process = teacherModel.find({ instituteId: req.user.instituteId._id, status: "COMPLETED" });
    process
        .then(teachers => {
            const teachersDetails = formateTeacherDetails(teachers);
            const response = {
                status: statusCode.Success,
                message: 'teacher fetch success!',
                data: teachersDetails !== null ? teachersDetails : {},
            }
            resolve(response);
        })
        .catch(teacherErr => {
            logger.error(`getteacher - error getting the teachers ${JSON.stringify(teacherErr, null, 2)}`);
            reject(internalError)
        })
});

module.exports = {
    getTeachers,
    instituteTeachers
}