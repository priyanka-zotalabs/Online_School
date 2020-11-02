const _ = require('lodash');
const logger = require("../../lib/logger");
const courseModel = require("../../models/database/course");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const liveClassModel = require("../../models/database/liveClass")
const internalErrorObj = internalError;
const uuid4 = require('uuid4')
const config = require('../../config/index');
const onboardedTeacherModel = require("../../models/database/onboardedTeacher");
const moment = require('moment')
const emailHelper = require('../../lib/emailHelper');


/**
 * This fn is to validate addTeacher Body
 * @param {Object} body
 */
const validateAddTeacherBody = (body) => {
    if (!body.name) { throw new Error("Name not found"); }
    if (!body.email) { throw new Error("email not found"); }
    if (!body.contactNumber) { throw new Error("contactNumber not found"); }
    return true;
};


/**
 * this fn is for featch Data For AddTeacher
 */
const featchDataForAddTeacher = (body) => new Promise((resolve, reject) => {
    onboardedTeacherModel.findOne({ email: body.email })
        .then(result => {
            if (result) { throw new Error("Email Id is present, Try another email"); }
            resolve(body);
        })
        .catch(error => {
            logger.error(`featchDataForAddTeacher - error getting the featchDataForAddTeacher ${JSON.stringify(error, null, 2)}`);
            reject({ status: statusCode.InvalidData, message: error.message });
        })
});


/**
 * This fn is for add Teacher to DB
 * @param {*} body 
 */
const addTeacherToDB = (body) => new Promise((resolve, reject) => {
    const teacherDetails = {
        adminUserId: body.adminUserId,
        adminId: body.adminId,
        name: body.name,
        email: body.email,
        contactNumber: body.contactNumber,
        status: "pending",
    }
    onboardedTeacherModel
        .addMultiple(teacherDetails)
        .then((updateResult) => {
            logger.info(`addTeacherToDB - add Teacher To DB successfully`);
            resolve(updateResult);
        })
        .catch((updateError) => {
            logger.error(
                `addTeacherToDB - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalErrorObj);
        });
});


/**
 * This fn is for Add Onborded Teacher
 * @param {*} body 
 * @param {*} user 
 */
const addTeacher = (body, user) => new Promise((resolve, reject) => {
    try {
        body.adminUserId = user._id;
        body.adminId = user.userMetaData._id;
        validateAddTeacherBody(body);
        featchDataForAddTeacher(body)
            .then(emailHelper.teacherOnboardedEmail)
            // addTeacherToDB
            .then(addTeacherToDB(body))
            .then(result => {
                logger.info(`addTeacher - add Teacher successful`);
                resolve({
                    status: statusCode.Success,
                    message: 'Successfully add Teacher',
                    data: result
                });
            })
            .catch(error => reject(error))

    } catch (e) {
        logger.error(`addTeacher - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }

});


/**
 * This function is to get  All Onborded Teacher
 */
const getAllOnbordedTeacher = () =>
    new Promise((resolve, reject) => {
        onboardedTeacherModel
            .find({})
            //   .find({ adminUserId: req.user._id})
            .then((teacher) => {
                const response = {
                    status: statusCode.Success,
                    message: "Onborded Teacher fetch success!",
                    data: teacher,
                };
                resolve(response);
            })
            .catch((err) => {
                logger.error(`getAllOnbordedTeacher - error getting the getAllOnbordedTeacher ${err}`);
                reject(internalError);
            });
    });

module.exports = {
    addTeacher,
    getAllOnbordedTeacher
}