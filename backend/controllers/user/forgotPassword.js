const userModel = require('../../models/database/user');
const utils = require('../../lib/utils');
const moment = require('moment');
const logger = require('../../lib/logger');
const emailHelper = require('../../lib/emailHelper');
const { statusCode } = require('../../lib/constant')

/**
 * Generates token and Sends password reset email
 * @param {Object} body 
 */
const recover = (body) => new Promise((resolve, reject) => {
    const { email } = body;
    userModel.findOne({ email })
        .then(userResult => {
            if (!userResult) {
                logger.error(`recover: email ${email} does not exist in system`);
                const error = {
                    status: statusCode.InvalidData,
                    message: "Email not registered in system"
                }
                return reject(error)
            }
            const userUpdate = {
                resetPasswordToken: utils.generateToken(),
                resetPasswordExpires: moment().utc().add(1, 'hours')
            };
            userModel.update({ _id: userResult._id }, userUpdate)
                .then(() => emailHelper.passwordRecoveryEmail({
                    email,
                    token: userUpdate.resetPasswordToken
                }))
                .then(result => {
                    logger.info(`Email sent for reset password token ${email}`)
                    const success = {
                        status: 200,
                        message: 'Email sent with reset password link!'
                    }
                    resolve(success)
                })
                .catch(updateError => {
                    reject(updateError)
                });
        })
        .catch(userError => {
            logger.error(`recover - recoveryError:${JSON.stringify(userError, null, 2)}`);
            reject(internalErrorObj);
        });
});

/**
 * Reset Password - Validate password reset token and shows the password reset view
 * @param {Object} params 
 */
const validateToken = (params) => new Promise((resolve, reject) => {
    const query = params.token;
    userModel.findOne({ resetPasswordToken: query, resetPasswordExpires: { $gt: moment().utc() } })
        .then(userResult => {
            if (!userResult) {
                const error = {
                    status: 401,
                    message: 'Password reset token is invalid or has expired.'
                }
                return reject(error)
            } else {


                const success = {
                    status: 200,
                    message: 'Reset password token is valid'
                }
                resolve(success)
            }
        })
        .catch(userError => {
            logger.error(`invalidToken  - token is invalid :${JSON.stringify(userError, null, 2)}`);
            reject(internalErrorObj);
        })
})

/**
 * Reset Password
 * @param {Object} params 
 * @param {Object} body 
 */
const resetPassword = (params, body) => new Promise((resolve, reject) => {
    if (body.password.localeCompare(body.confirmPassword) == 0) {
        const query = params.token;
        userModel.findOne({ resetPasswordToken: query, resetPasswordExpires: { $gt: moment().utc() } })
            .then(userResult => {
                if (!userResult) {
                    logger.error(`resetPassword: reset password token invalid or expired`)
                    const error = {
                        status: statusCode.InvalidData,
                        message: 'Password reset token is invalid or has expired.'
                    };
                    return reject(error);
                }
                const userUpdate = {
                    password: utils.generateBcryptHash(body.password),
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                };
                userModel.update({ _id: userResult._id }, userUpdate)
                    .then(updateResult => {
                        logger.info(`resetPassword: reset password success`)
                        const success = {
                            status: statusCode.Success,
                            message: 'Successfully password reset'
                        }
                        return resolve(success);
                    })
                    .catch(updateError => {
                        logger.error(`resetPassword: reset password err${updateError}`)
                        reject(internalErrorObj);
                    });
            })
            .catch(userError => {
                logger.error(`resetPassword - password error:${JSON.stringify(userError, null, 2)}`);
                reject(internalErrorObj);
            });
    } else {
        logger.error(`resetPassword:Confirm Password do not match Password `)
        const fail = {
            status: statusCode.InvalidData,
            message: 'Confirm Password do not match Password'
        };
        return reject(fail);
    }
})

module.exports = {
    recover,
    validateToken,
    resetPassword
}