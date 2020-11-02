const userModel = require('../../models/database/user');
const teacherModel = require('../../models/database/teacher');

const utils = require('../../lib/utils');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant')

const validateBody = (passwordDetails) => {
    if (!passwordDetails.newPassword) { throw new Error('newPassword cannot be empty') }
    if (!passwordDetails.confirmPassword) { throw new Error('confirmPassword cannot be empty') }
    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) { throw new Error('newPassword should match confirmPassword') }
    return true;
}
/**
 * Change password
 * @param {Object} body 
 * @param {Object} user 
 */
const firstLoginChangePassword = (body, user) => new Promise((resolve, reject) => {
    const passwordDetails = {
        currentPassword: body.currentPassword,
        newPassword: body.newPassword,
        confirmPassword: body.confirmPassword
    };
    try {
        validateBody(passwordDetails);
        userModel.findOne({ _id: user._id })
            .then(userResult => {
                if (!userResult) {
                    logger.error(`changePassword - user not found`);
                    return reject(internalError);
                }
                if ((passwordDetails.currentPassword.trim() === "" && userResult.password === "") ||
                    utils.compareHash(passwordDetails.currentPassword.trim(), userResult.password)) {
                    userModel.update({ _id: userResult._id }, {
                        password: utils.generateBcryptHash(passwordDetails.newPassword)
                    })
                        .then(teacherModel.update({ userId: userResult._id }, {
                            isFirstLogin: false
                        }))
                        .then(updateResult => {
                            const success = {
                                status: statusCode.Success,
                                message: 'Password changed successfully'
                            };
                            logger.info(`User changed successfully ${user.email}`)
                            resolve(success);
                        })
                        .catch(updateError => {
                            logger.error(`changePassword:change password failed:${updateError}`)
                            reject(internalError);
                        });
                } else {
                    logger.error(`changePassword: Current Password do not match Password`)
                    const fail = {
                        status: statusCode.InvalidData,
                        message: 'Current password is incorrect'
                    };
                    reject(fail);
                }
            })
            .catch(userError => {
                logger.error(`changePasswordError - password error:${JSON.stringify(userError, null, 2)}`);
                reject(internalErrorObj);
            });
    } catch (e) {
        logger.error(`changePassword: ${e.message}`)
        const fail = {
            status: statusCode.InvalidData,
            message: e.message
        };
        reject(fail);
    }
})

module.exports = {
    firstLoginChangePassword
}