const userModel = require('../../models/database/user');
const utils = require('../../lib/utils');
const logger = require('../../lib/logger');
const { internalError, statusCode } = require('../../lib/constant');

/**
 * This fn is to check the signIn details
 * @param {Object} data 
 */
const validateSigInData = (data) => {
    if (!data.user) { throw new Error('Invalid email id'); }
    if (!utils.compareHash(data.password.trim(), data.user.password)) { throw new Error('Invalid password'); }
    return true;
}

/**
 * This fn is to fetch the require data from db for sign in
 * @param {Object} data 
 */
const fetchSignInData = (body) => new Promise((resolve, reject) => {
    userModel.findOne({ email: body.email })
        .then(user => {
            body.user = user;
            try {
                validateSigInData(body);
                delete user.password;
                logger.info(`User validated successfully ${user.email}`);
                resolve(user);
            }
            catch (e) {
                logger.error(`fetchSignInData - error while sign in ${JSON.stringify(e, null, 2)}`);
                const errObj = {
                    status: statusCode.InvalidData,
                    message: e.message,
                };
                reject(errObj);
            }
        })
        .catch(err => {
            logger.error(`fetchSignInData - error while sign in ${JSON.stringify(err, null, 2)}`);
            reject(internalError);
        });
});

const fetchUserMultipaleData = (user) => new Promise((resolve, reject) => {
    userMetaData={}
    let roles = user.roleId
    let userModel = []
    let process = [];
    roles.forEach(role => {
        process.push(fetchUserCompleteData(user,role,userMetaData))
    });
    // console.log(process)
   
    Promise.all(process)
        .then((result) => {
            // console.log(result,userMetaData)
            let userData = {
                ...user,
                userMetaData,
            };
            resolve(userData);
        })
        .catch(err => {
            logger.error(`getUpcomingCourses - error getting the Courses ${err}`);
            reject(internalError)
        })
});


/**
 * This fn is to get user complete details on successful sign in
 * @param {Object} user 
 */
const fetchUserCompleteData = (user,role,userMetaData) => new Promise((resolve, reject) => {
    utils.getUserModel(role.code).findOne({ userId: user._id })
        .then(result => {
            delete result.userId;
            roleName=role.displayName
            userMetaData[roleName]=result
            resolve(userMetaData);
        })
        .catch(userErr => {
            logger.error(`fetchUserCompleteData - err ${JSON.stringify(userErr, null, 2)}`);
            reject(internalError);
        })
});


// /**
//  * This fn is to get user complete details on successful sign in
//  * @param {Object} user 
//  */
// const fetchUserCompleteData = (user) => new Promise((resolve, reject) => {
//     utils.getUserModel(user.roleId.code).findOne({ userId: user._id })
//         .then(userMetaData => {
//             delete userMetaData.userId;
//             let userData = {
//                 ...user,
//                 userMetaData,
//             };
//             resolve(userData);
//         })
//         .catch(userErr => {
//             logger.error(`fetchUserCompleteData - err ${JSON.stringify(userErr, null, 2)}`);
//             reject(internalError);
//         })
// });

/**
 * This fn is to sign in user
 * @param {Object} body 
 */
const signIn = (body) => new Promise((resolve, reject) => {
    fetchSignInData(body)
        .then(fetchUserMultipaleData)
        .then(user => resolve(user))
        .catch(err => reject(err));
})


module.exports = {
    signIn,
}