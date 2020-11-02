const _ = require('lodash');
const instituteModel = require('../../models/database/institute');
const userModel = require('../../models/database/user');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');




/**
 * This function is for Validate Update institute Body
 * @param {*} body 
 */
const validateUpdateinstituteBody = (body) => {
    if (!body.name) { throw new Error("name not found"); }
    return true;
};


/**
 * This fn is for add Data To Update institute Collection
 * @param {*} body 
 */
const addDataToUpdateinstituteProfile = (body) => new Promise((resolve, reject) => {
    let instituteData = {
        name: body.name,
        // email: body.email,
        imageUrl: body.imageUrl,
        contactNumber: body.contactNumber,
        aboutMe: body.aboutMe,
        subject: body.subject,
        board: body.board,
        website: body.website,
        experience: body.experience,
        location: body.location,
        brochureUrl: body.brochureUrl,
    };
    if (body.institute.isFirstLogin == true) {
        instituteData.isFirstLogin = false
    }
    instituteModel
        .update({ _id: body.instituteId }, instituteData)
        .then((updateResult) => {
            logger.info(`addDataToUpdateinstituteProfile -Update institute Profile successfully`);
            resolve(updateResult);
        })
        .catch((updateError) => {
            logger.error(
                `addDataToUpdateinstituteProfile - error:${JSON.stringify(
                    updateError,
                    null,
                    2
                )}`
            );
            reject(internalError);
        });
});




/**
 * This Function is for featch Data For Update institute
 * @param {*} body 
 */
const fetchDataForUpdateProfile = (body) => new Promise((resolve, reject) => {
    instituteModel
        .findOne({ _id: body.instituteId })
        .then((institute) => {
            if (institute) {
                body.institute = institute
                resolve(body);
            }
        })
        .catch((fetchDataForUpdateProfileError) => {
            logger.error(`fetchDataForUpdateProfile - error ${fetchDataForUpdateProfileError}`);
            reject(internalError);
        });
});

/**
 * This fn Is for Update institute Profile
 * @param {*} body 
 * @param {*} user 
 */
const updateInstituteProfile = (body, user) => new Promise((resolve, reject) => {
    try {
        body.userId = user._id;
        body.instituteId = user.instituteId._id;
        validateUpdateinstituteBody(body);
        fetchDataForUpdateProfile(body)
            .then(addDataToUpdateinstituteProfile)
            .then(updateResult => {
                const success = {
                    status: statusCode.Success,
                    message: 'update institute Profile  successfully'
                };
                logger.info(`Update institute Profile successfully ${updateResult}`)
                resolve(success);
            })
            .catch(updateError => {
                logger.error(`updateinstitute : Update institute Profile failed:${updateError}`)
                reject(updateError);
            });
    } catch (e) {
        logger.error(`updateinstitute - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

module.exports = {
    updateInstituteProfile
}