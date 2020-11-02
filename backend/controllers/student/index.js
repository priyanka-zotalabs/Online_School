const _ = require('lodash');
const studentModel = require('../../models/database/student');
const userModel = require('../../models/database/user');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');




/**
 * This function is for Validate Update student Body
 * @param {*} body 
 */
const validateUpdatestudentBody = (body) => {
    if (!body.name) { throw new Error("name not found"); }
    return true;
};


/**
 * This fn is for add Data To Update student Collection
 * @param {*} body 
 */
const addDataToUpdatestudentProfile = (body) => new Promise((resolve, reject) => {
    updateObj = {
        name: body.name,
        imageUrl: body.imageUrl,
        contactNumber: body.contactNumber,
        board: body.board,
        class: body.class,
        location: body.location,
        school: body.school,
    };
    studentModel
        .update({ _id: body.studentId }, updateObj)
        .then((updateResult) => {
            logger.info(`addDataToUpdatestudentProfile -Update student Profile successfully`);
            resolve(updateResult);
        })
        .catch((updateError) => {
            logger.error(
                `addDataToUpdatestudentProfile - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});




/**
 * This Function is for featch Data For Update student
 * @param {*} body 
 */
const fetchDataForUpdateProfile = (body) => new Promise((resolve, reject) => {
    studentModel
        .findOne({ _id: body.studentId })
        .then((student) => {
            if (student) {
                resolve(body);
            }
        })
        .catch((fetchDataForUpdateProfileError) => {
            logger.error(`fetchDataForUpdateProfile - error ${fetchDataForUpdateProfileError}`);
            reject(internalError);
        });
});

/**
 * This fn Is for Update student Profile
 * @param {*} body 
 * @param {*} user 
 */
const updateProfile = (body, user) => new Promise((resolve, reject) => {
    try {
        body.userId = user._id;
        // body.instituteId=user.instituteId._id;
        body.studentId = user.userMetaData.Student._id;
        validateUpdatestudentBody(body);
        fetchDataForUpdateProfile(body)
            .then(addDataToUpdatestudentProfile)
            .then(updateResult => {
                const success = {
                    status: statusCode.Success,
                    message: 'update student Profile  successfully'
                };
                logger.info(`Update student Profile successfully ${updateResult}`)
                resolve(success);
            })
            .catch(updateError => {
                logger.error(`updatestudent : Update student Profile failed:${updateError}`)
                reject(updateError);
            });
    } catch (e) {
        logger.error(`updatestudent - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})



/**
 *  This function is to format the student Details
 * @param {*} studentDetails 
 */
const formatstudentsDetails = (studentDetails) => {
    const data = studentDetails.userId;
    delete data.password;
    delete studentDetails.userId;
    data.userMetaData = studentDetails;
    return data;
}

/**
 * This function is to get the student Profile
 * @param {Object} params 
 */
const getProfile = (user) => new Promise((resolve, reject) => {
    studentId = user.userMetaData.Student._id
    studentModel.findOne({ _id: studentId })
        .then(studentProfile => {
            const studentProfileData = formatstudentsDetails(studentProfile)
            const response = {
                status: statusCode.Success,
                message: 'student Profile fetch success!',
                data: studentProfileData,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getstudentProfile - error getting the student Profile ${err}`);
            reject(internalError)
        })
});


/**
 * This function is to get the student Profile
 * @param {Object} params 
 */
const searchProfile = (req) => new Promise((resolve, reject) => {
    const studentId = req.query.studentId;
    studentModel.findOne({ _id: studentId })
        .then(studentProfile => {
            const studentProfileData = formatstudentsDetails(studentProfile)
            const response = {
                status: statusCode.Success,
                message: 'student Profile fetch success!',
                data: studentProfileData,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getstudentProfile - error getting the student Profile ${err}`);
            reject(internalError)
        })
});

module.exports = {
    getProfile,
    updateProfile,
    searchProfile
}