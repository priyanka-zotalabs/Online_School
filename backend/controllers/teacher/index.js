const _ = require('lodash');
const teacherModel = require('../../models/database/teacher');
const userModel = require('../../models/database/user');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');




/**
 * This function is for Validate Update Teacher Body
 * @param {*} body 
 */
const validateUpdateTeacherBody = (body) => {
    if (!body.name) { throw new Error("name not found"); }
    return true;
};


/**
 * This fn is for add Data To Update teacher Collection
 * @param {*} body 
 */
const addDataToUpdateTeacherProfile = (body) => new Promise((resolve, reject) => {
    updateObj = {
        name: body.name,
        imageUrl: body.imageUrl,
        contactNumber: body.contactNumber,
        aboutMe: body.aboutMe,
        subject: body.subject,
        board: body.board,
        qualification: body.qualification,
        experience: body.experience,
        location: body.location,
        linkedInUrl: body.linkedInUrl,
        resumeUrl: body.resumeUrl,
        isFirstLogin: false
        //   isFirstLogin:{type: Boolean ,default:true },
        //   status:{type: String,default:"PENDING" }
    };
    if (body.status == "PENDING") { updateObj.status = "COMPLETED" }
    console.log(updateObj)
    teacherModel
        .update({ _id: body.teacherId }, updateObj)
        .then((updateResult) => {
            logger.info(`addDataToUpdateTeacherProfile -Update Teacher Profile successfully`);
            resolve(updateResult);
        })
        .catch((updateError) => {
            logger.error(
                `addDataToUpdateTeacherProfile - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});




/**
 * This Function is for featch Data For Update Teacher
 * @param {*} body 
 */
const fetchDataForUpdateProfile = (body) => new Promise((resolve, reject) => {
    teacherModel
        .findOne({ _id: body.teacherId })
        .then((teacher) => {
            body.status = teacher.status
            resolve(body);
        })
        .catch((fetchDataForUpdateProfileError) => {
            logger.error(`fetchDataForUpdateProfile - error ${fetchDataForUpdateProfileError}`);
            reject(internalError);
        });
});

/**
 * This fn Is for Update Teacher Profile
 * @param {*} body 
 * @param {*} user 
 */
const updateProfile = (body, user) => new Promise((resolve, reject) => {
    try {
        body.userId = user._id;
        // body.instituteId=user.instituteId._id;
        body.teacherId = user.userMetaData.Teacher._id;
        validateUpdateTeacherBody(body);
        fetchDataForUpdateProfile(body)
            .then(addDataToUpdateTeacherProfile)
            .then(updateResult => {
                const success = {
                    status: statusCode.Success,
                    message: 'update Teacher Profile  successfully'
                };
                logger.info(`Update Teacher Profile successfully ${updateResult}`)
                resolve(success);
            })
            .catch(updateError => {
                logger.error(`updateTeacher : Update Teacher Profile failed:${updateError}`)
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



/**
 *  This function is to format the Teacher Details
 * @param {*} teacherDetails 
 */
const formatTeachersDetails = (teacherDetails) => {
    const data = teacherDetails.userId;
    delete data.password;
    delete teacherDetails.userId;
    data.userMetaData = teacherDetails;
    return data;
}

/**
 * This function is to get the Teacher Profile
 * @param {Object} params 
 */
const getProfile = (user) => new Promise((resolve, reject) => {
    teacherId = user.userMetaData.Teacher._id
    teacherModel.findOne({ _id: teacherId })
        .then(teacherProfile => {
            const teacherProfileData = formatTeachersDetails(teacherProfile)
            const response = {
                status: statusCode.Success,
                message: 'Teacher Profile fetch success!',
                data: teacherProfileData,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getTeacherProfile - error getting the Teacher Profile ${err}`);
            reject(internalError)
        })
});


module.exports = {
    getProfile,
    updateProfile
}