const _ = require('lodash');
const logger = require("../../lib/logger");
const { statusCode, internalError } = require("../../lib/constant");
const userModel = require("../../models/database/user")
const teacherModel = require("../../models/database/teacher")
const studentModel = require("../../models/database/student")
const internalErrorObj = internalError;
const config = require('../../config/index');
const utils = require('../../lib/utils');


const validateUpdateBody = (body) => {
    if (!body.name) { throw new Error("name not found"); }
    return true;
};

const validateUpdateEmailBody = (req) => {
    if (req.user.email) { throw new Error("Cannot change email"); }
    if (!req.body.email) { throw new Error("email not found"); }
    return true;
};

const validateUpdatePhoneBody = (req) => {
    if (req.user.contactNumber) { throw new Error("Cannot change contact number"); }
    if (!req.body.contactNumber) { throw new Error("Contact number not found"); }
    if (!req.body.countryCode) { throw new Error("Country code not found"); }
    return true;
};

const updateName = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req;
        body.id = req.user.userMetaData._id;
        validateUpdateBody(body);
        if (req.user.roleId.code == config.role.STUDENT) {
            model = studentModel
        }
        else if (req.user.roleId.code == config.role.TEACHER) {
            model = teacherModel
        }
        model.update({ _id: body.id }, { name: utils.toTitleCase(body.name) })
            .then((updateResult) => {
                logger.info(`update - name updation successful`);
                req.user.userMetaData.name = utils.toTitleCase(body.name);
                const response = {
                    status: statusCode.Success,
                    meaasge: "Name updated successfully"
                }
                resolve(response);
            })
            .catch((updateError) => {
                logger.error(
                    `updateName - error:${JSON.stringify(
                        updateError,
                        null,
                        2
                    )}`
                );
                reject(internalErrorObj);
            });
    }
    catch (e) {
        logger.error(`updateName - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})


const updateEmail = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req;
        body.id = req.user._id;
        validateUpdateEmailBody(req);
        userModel.findOne({ email: body.email })
            .then((user) => {
                if (user) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "Email already exist"
                    })
                } else {
                    userModel.update({ _id: body.id }, { email: body.email })
                        .then((updateResult) => {
                            logger.info(`updateEmail - Email updation successful`);
                            req.user.email = body.email;
                            const response = {
                                status: statusCode.Success,
                                meaasge: "Email updated successfully"
                            }
                            resolve(response);
                        })
                        .catch((updateError) => {
                            logger.error(
                                `updateEmaileror - error:${JSON.stringify(
                                    updateError,
                                    null,
                                    2
                                )}`
                            );
                            reject(internalErrorObj);
                        });
                }
            })
            .catch((processError) => {
                logger.error(
                    `checkEmail - Error occurred in fetching data: ${JSON.stringify(
                        processError,
                        null,
                        2
                    )}`
                );
                reject(internalErrorObj);
            });

    }
    catch (e) {
        logger.error(`UpdateEmail - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

const updateContactNumber = (req) => new Promise((resolve, reject) => {
    try {
        const { body } = req;
        body.id = req.user._id;
        validateUpdatePhoneBody(req);
        userModel.findOne({ contactNumber: `${body.countryCode}-${body.contactNumber}`  })
            .then((user) => {
                if (user) {
                    reject({
                        status: statusCode.InvalidData,
                        message: "Contact number already exist"
                    })
                } else {
                    userModel.update({ _id: body.id }, { contactNumber: `${body.countryCode}-${body.contactNumber}` })
                        .then((updateResult) => {
                            logger.info(`updateContactNumber - Contact number updation successful`);
                            req.user.contactNumber = body.contactNumber;
                            const response = {
                                status: statusCode.Success,
                                meaasge: "Contact number updated successfully"
                            }
                            resolve(response);
                        })
                        .catch((updateError) => {
                            logger.error(
                                `updateContactNumbererror - error:${JSON.stringify(
                                    updateError,
                                    null,
                                    2
                                )}`
                            );
                            reject(internalErrorObj);
                        });
                }
            })
            .catch((processError) => {
                logger.error(
                    `checkContactNumber - Error occurred in fetching data: ${JSON.stringify(
                        processError,
                        null,
                        2
                    )}`
                );
                reject(internalErrorObj);
            });

    }
    catch (e) {
        logger.error(`UpdateContactNumber - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

module.exports = {
    updateName,
    updateEmail,
    updateContactNumber
}