const logger = require('../../../lib/logger');
const userModel = require('../../../models/database/user');
const roleModel = require('../../../models/database/role');
const config = require('../../../config/index');
const utils = require('../../../lib/utils');
const internalErrorObj = { status: 500, message: 'Internal Error occurred' };

/**
 * This fn is to validate the body received for admin signup
 * @param {Object} body
 */
const validateSignupBody = (body) => {
    if (!body.email) { throw new Error('email not found'); }
    if (!body.password) { throw new Error('password not found'); }
    return true;
};

const validateDataForSignup = (user, role) => {
    if (user) { throw new Error('Email id already exists'); }
    if (!role) { throw new Error('roleCode outside the system'); }
    return true;
}

/**
 * This function is to fetch the pre-requisite data for signup
 * @param {Object} body
 */
const fetchDataForSignup = (body) => new Promise((resolve, reject) => {
    const process = [
        userModel.findOne({ email: body.email }),
        roleModel.findOne({ code: config.role.ADMIN }),
    ];
    Promise.all(process)
        .then((processRes) => {
            try {
                const [user, role] = processRes;
                validateDataForSignup(user, role);
                body.role = role;
                resolve(body);
            }
            catch (e) {
                logger.error(`fetchDataForOnboarding - Error occurred in fetching data: ${JSON.stringify(e, null, 2)}`)
                const errObj = {
                    status: 422,
                    message: e.message,
                }
                reject(errObj);
            }
        })
        .catch((processError) => {
            logger.error(`fetchDataForOnboarding - Error occurred in fetching data: ${JSON.stringify(processError, null, 2)}`)
            reject(internalErrorObj);
        })
});

/**
 * This function is to add data to respective user collections
 * @param {Object} body 
 */
const addDataToRespectiveUserCollection = (body) => new Promise((resolve, reject) => {
    const userMetaData = {
        userId: body.user._id,
        name: body.name ? utils.toTitleCase(body.name) : 'Admin',
    };
    utils.getUserModel(body.role.code).addMultiple([userMetaData])
        .then(userMetaDataResult => {
            logger.info(`addDataToRespectiveUserCollection - added data to user respective collection`);
            resolve(body);
        })
        .catch(userMetaDataError => {
            logger.error(`addDataToRespectiveUserCollection - error in adding data to user respective collection: ${JSON.stringify(userMetaDataError, null, 2)}`);
            reject(internalErrorObj);
        })
});

/**
 * This function is to add data to user collection
 * @param {Object} body 
 */
const addDataToUserCollection = (body) => new Promise((resolve, reject) => {
    const userDetails = {
        email: body.email,
        password: utils.generateBcryptHash(body.password),
        roleId: [body.role._id],
    };
    userModel.addMultiple([userDetails])
        .then(userResult => {
            logger.info(`addDataToUserCollection - user data added successfully`);
            [body.user] = userResult;
            resolve(body);
        })
        .catch(userError => {
            logger.error(`addDataToUserCollection - error:${JSON.stringify(userError, null, 2)}`);
            reject(internalErrorObj);
        })
});

/**
 * This function is for admin signup
 * @param {Object} body
 */
const adminSignup = (body) => new Promise((resolve, reject) => {
    try {
        validateSignupBody(body);
        fetchDataForSignup(body)
            .then(addDataToUserCollection)
            .then(addDataToRespectiveUserCollection)
            .then(result => {
                logger.info(`admin ${body.email} signup successful :${result}`);
                resolve({
                    status: 200,
                    message: 'Successfully sign up',
                });
            })
            .catch(error => reject(error))
    } catch (e) {
        logger.error(`adminSignup - error while parsing the body ${e}`);
        const errObj = {
            status: 422,
            message: e.message,
        };
        reject(errObj);
    }
})


module.exports = {
    adminSignup,
}