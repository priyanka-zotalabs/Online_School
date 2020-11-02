const roleModel = require('../../models/database/role');
const userModel = require('../../models/database/user');
const teacherModel = require('../../models/database/teacher');
const adminModel = require('../../models/database/admin');
const config = require("../../config/index");
const loginCtrl = require("../user/signIn");

const utils = require('../../lib/utils');

const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');






/**
 * This fn is to fetch the require data from db for Add teacher Role
 * @param {Object} data 
 */
const fetchUserData = (body) => new Promise((resolve, reject) => {
    userModel.findOne({ email: body.email })
        .then(user => {
            try {
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


/**
 * This fn is for fetch User Multipale Data
 * @param {*} user 
 */
const fetchUserMultipaleData = (user) => new Promise((resolve, reject) => {
    userMetaData = {}
    let roles = user.roleId
    let userModel = []
    let process = [];
    roles.forEach(role => {
        process.push(fetchUserCompleteData(user, role, userMetaData))
    });
    console.log(process)

    Promise.all(process)
        .then((result) => {
            console.log(result, userMetaData)
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
 * This fn is to get user complete details on Add Teacher Role
 * @param {Object} user 
 */
const fetchUserCompleteData = (user, role, userMetaData) => new Promise((resolve, reject) => {
    utils.getUserModel(role.code).findOne({ userId: user._id })
        .then(result => {
            delete result.userId;
            roleName = role.displayName
            userMetaData[roleName] = result
            resolve(userMetaData);
        })
        .catch(userErr => {
            logger.error(`fetchUserCompleteData - err ${JSON.stringify(userErr, null, 2)}`);
            reject(internalError);
        })
});


/**
 * This function is for validate Add New Role To User Body
 * @param {*} body 
 */
const validateAddTeacherRoleBody = (body) => {
    if (!body.userId) { throw new Error("UserId not found"); }
    return true;
};


/**
 * This fn Is for validate Featch Data
 * @param {*} user 
 * @param {*} role 
 * @param {*} teacher 
 */
const validateFeatchData = (user, role, teacher) => {
    if (!user) { throw new Error("UserId not found"); }
    if (!role) { throw new Error("roleId not found"); }
    if (teacher) { throw new Error("teacher Alredy exist!"); }
    return true;
};

/**
 * This fn is for add Data To assignTeacherRoleToUser
 * @param {*} body 
 */
const assignTeacherRoleToUser = (body) => new Promise((resolve, reject) => {

    let userMetaData = {
        userId: body.userId,
        instituteId: body.instituteId,
        name: "",
        imageUrl: "",
        contactNumber: "",
        aboutMe: "",
        subject: "",
        board: "",
        qualification: "",
        experience: "",
        location: "",
        linkedInUrl: "",
        resumeUrl: "",
    };

    const process = [
        userModel
            .arrayUpdate({ _id: body.userId }, { roleId: body.role._id }),
        teacherModel.addMultiple([userMetaData]),
    ];

    Promise.all(process)
        .then((processResult) => {
            try {
                const [user, teacher] = processResult;

                resolve(teacher);
            } catch (error) {
                logger.error(`assignTeacherRoleToUser - error ${error}`);
                reject({
                    status: statusCode.InvalidData,
                    message: error.message
                });
            }
        })
        .catch((processError) => {
            logger.error(
                `assignTeacherRoleToUser - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});






/**
 * thos fn is for fetch Data For Add Teacher Role
 * @param {*} body 
 */
const fetchDataForAddTeacherRole = (body) => new Promise((resolve, reject) => {
    const process = [
        userModel.findOne({ _id: body.userId }),
        roleModel.findOne({ code: config.role.TEACHER }),
        teacherModel.findOne({ userId: body.userId })
    ];

    Promise.all(process)
        .then((processResult) => {
            try {
                const [user, role, teacher] = processResult;
                validateFeatchData(user, role, teacher);
                body.user = user;
                body.role = role;

                resolve(body);
            } catch (error) {
                logger.error(`fetchDataForAddTeacherRole - error ${error}`);
                reject({
                    status: statusCode.InvalidData,
                    message: error.message
                });
            }
        })
        .catch((processError) => {
            logger.error(
                `fetchDataForAddTeacherRole - Error occurred in fetching data: ${JSON.stringify(
                    processError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});





/**
 * This fn Is for addTeacherRole
 * @param {*} body 
 */
const addTeacherRole = (req) => new Promise((resolve, reject) => {
    try {
        const user = req.user
        const body = {}
        body.userId = user._id;
        body.instituteId = user.instituteId._id;
        body.email = user.email
        validateAddTeacherRoleBody(body);
        fetchDataForAddTeacherRole(body)
            .then(assignTeacherRoleToUser)
            .then(fetchUserData)
            .then(fetchUserMultipaleData)
            .then(userResult => {
                req.user = userResult;
                logger.info(`Add Teacher Role successfully ${userResult}`)
                const success = {
                    status: statusCode.Success,
                    message: 'Add Teacher Role successfully',
                    data: userResult
                };
                resolve(success);
            })
            .catch(updateError => {
                logger.error(`addTeacherRole : Add Teacher Role failed:${updateError}`)
                reject(updateError);
            });
    } catch (e) {
        logger.error(`updateTeacher - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})




module.exports = {
    addTeacherRole
}