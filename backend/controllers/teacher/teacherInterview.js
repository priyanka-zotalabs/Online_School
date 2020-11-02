const logger = require('../../lib/logger');
const userModel = require('../../models/database/user');
const { statusCode } = require('../../lib/constant');
const { role } = require('../../config/index');
const internalErrorObj = { status: statusCode.InternalError, message: 'Internal Error occurred' };
const teacherInterviewModel = require('../../models/database/teacherInterview');
const teacherModel = require('../../models/database/teacher');
const moment = require('moment');
const async = require('async');
const emailHelper = require("../../lib/emailHelper");


/**
 * This fn is to validate the body received
 * @param {Object} body 
 */
const validateApplyTeacherBody = (body) => {
    if (!body.name) { throw new Error('name not found'); }
    if (!body.email) { throw new Error('email not found'); }
    if (!body.contactNumber) { throw new Error('contactNumber not found'); }
    if (!body.countryCode) { throw new Error('countryCode not found'); }
    if (!body.dob) { throw new Error('dob not found'); }
    if (!body.teacherQualification) { throw new Error('teacherQualification not found'); }
    if (!body.teachingExperience) { throw new Error('teachingExperience not found'); }
    if (!body.primarySubject) { throw new Error('primarySubject not found'); }
    if (!body.grade) { throw new Error('grade not found'); }
    if (!body.board) { throw new Error('board not found'); }
    if (!body.currentOccupation) { throw new Error('currentOccupation not found'); }
    if (!body.internetSpeed) { throw new Error('internetSpeed not found'); }
    if (!body.address) { throw new Error('address not found'); }
    return true;
};

/**
 * This fn is to Validate updateTeacherInterview Body
 * @param {*} body 
 */
const validateUpdateTeacherInterviewBody = (body) => {
    if (!body.teacherInterviewIds) { throw new Error('teacherInterviewIds not found'); }
    return true;
};

/**
 * This fn validate the fetch data
 * @param {*} teacherInterview 
 * @param {*} grade 
 * @param {*} board 
 */
const validateApplyTeacherData = (teacherInterview, grade, board) => {
    if (teacherInterview.length) { throw new Error('Email id or Contact Number already exists'); }
    return true;
}

/**
 * ths fn Is to Add Data In to teacherInterview
 * @param {*} body 
 */
const addDataToTeacherInterview = (body) => new Promise((resolve, reject) => {
    const availableTimeDetails = {
        weekday: {
            preferTime: body.weekdayPreferTime || '',
            availableHours: body.weekdayAvailableHours || ''
        },
        weekend: {
            preferTime: body.weekendPreferTime || '',
            availableHours: body.weekendAvailableHours || ''
        },
    }
    const teacherData = {
        name: body.name,
        email: body.email,
        contactNumber: body.countryCode + "-" + body.contactNumber,
        dob: moment(body.dob, 'DD/MM/YYYY').utc(),
        teacherQualification: body.teacherQualification,
        teachingExperience: body.teachingExperience,
        resume: body.resume,
        linkedInUrl: body.linkedInUrl || '',
        primarySubject: body.primarySubject,
        secondarySubject: body.secondarySubject || '',
        grade: body.grade,
        board: body.board,
        exams: body.exams || '',
        availableTime: availableTimeDetails,
        currentOccupation: body.currentOccupation,
        internet: body.internet,
        address: body.address,
        reference: body.reference || '',
    };
    if (body.userId) { teacherData.userId = body.userId; }
    teacherInterviewModel.addMultiple([teacherData])
        .then(result => {
            if (body.userId && result.length) {
                teacherModel.update({ userId: body.userId }, { name: body.name, teacherInterview: result[0]._id })
                    .then(() => {
                        logger.info(`addDataToTeacher - added data to Teacher collection`);
                        resolve(result);
                    })
                    .catch(() => {
                        logger.info(`addDataToTeacher - added data to Teacher collection`);
                        resolve(result);
                    })
            } else {
                logger.info(`addDataToTeacher - added data to Teacher collection`);
                resolve(result);
            }
        })
        .catch(userMetaDataError => {
            logger.error(`addDataToTeacher - error in adding data to Teacher collection: ${JSON.stringify(userMetaDataError, null, 2)}`);
            reject(internalErrorObj);
        })
});


/**
 * This fn  fetch Data For Apply Teacher
 * @param {*} body 
 */
const fetchDataForApplyTeacher = (body) => new Promise((resolve, reject) => {
    const process = [
        teacherInterviewModel.find({
            $or: [{ email: body.email },
            { contactNumber: `${body.countryCode}-${body.contactNumber}` }]
        }),
        userModel.find({
            $or: [{ email: body.email },
            { contactNumber: `${body.countryCode}-${body.contactNumber}` }]
        }),
    ];
    Promise.all(process)
        .then((processRes) => {
            try {
                const [teacherInterview, users] = processRes;
                validateApplyTeacherData(teacherInterview);
                if (!body.userId && users) {
                    users.forEach(user => {
                        if (user.roleId.code === role.TEACHER) {
                            body.userId = user._id;
                        }
                    });
                }
                resolve(body);
            }
            catch (e) {
                logger.error(`fetchDataForApplyTeacher - Error occurred in fetching data: ${JSON.stringify(e, null, 2)}`)
                const errObj = {
                    status: statusCode.InvalidData,
                    message: e.message,
                }
                reject(errObj);
            }
        })
        .catch((processError) => {
            logger.error(`fetchDataForApplyTeacher - Error occurred in fetching data: ${JSON.stringify(processError, null, 2)}`)
            reject(internalErrorObj);
        })

})

/**
 * This function is to apply the Teacher
 * @param {*} req 
 * @param {*} resume 
 * @param {*} speedScreenshot 
 */
const applyTeacher = (req, resume, speedScreenshot) => new Promise((resolve, reject) => {
    try {
        const { body } = req;
        if (req.user) { body.userId = req.user._id };
        body.resume = resume;
        body.internet = {
            speed: body.internetSpeed,
            ...speedScreenshot
        }
        validateApplyTeacherBody(body);
        fetchDataForApplyTeacher(body)
            .then(addDataToTeacherInterview)
            .then(result => {
                logger.info(`Apply Teacher successful`);
                if (req.user && result.length) { req.user.userMetaData.teacherInterview = result[0] };
                resolve({
                    status: statusCode.Success,
                    message: 'Apply  Teacher successful',
                });
            })
            .catch(error => reject(error))
    } catch (e) {
        logger.error(`applyTeacher - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

/**
 * this fn get the all Apply Teachers
 */
const getApplyTeacher = (query) => new Promise((resolve, reject) => {
    let filter = {};
    if (query.status === 'PENDING') {
        filter = { status: 'PENDING' }
    } else if (query.status === 'APPROVED') {
        filter = { status: 'APPROVED' }
    } else if (query.status === 'REJECTED') {
        filter = { status: 'REJECTED' }
    } else if (query.status === 'APPROVED/REJECTED') {
        filter = { status: { $in: ['REJECTED', 'APPROVED'] } }
    }
    teacherInterviewModel.find(filter)
        .then(applyTeachers => {
            const response = {
                status: statusCode.Success,
                message: 'applyTeachers fetch success!',
                data: applyTeachers,
            }
            resolve(response);
        })
        .catch(getApplyTeachersErr => {
            logger.error(`getApplyTeachers - error getting the applyTeachers ${JSON.stringify(getApplyTeachersErr, null, 2)}`);
            reject(internalError)
        })
});


/**
 * this fn get the my Applied Status for apply now
 */
const myAppliedStatus = (user) => new Promise((resolve, reject) => {
    teacherInterviewModel.findOne({ userId: user._id })
        .then(applyTeacher => {
            const response = {
                status: statusCode.Success,
                message: 'applyTeacher status fetch success!',
                data: applyTeacher,
            }
            resolve(response);
        })
        .catch(getApplyTeacherErr => {
            logger.error(`myAppliedStatus - error getting the applyTeachers ${JSON.stringify(getApplyTeacherErr, null, 2)}`);
            reject(internalError)
        })
});

/**
 * This fn is to fetch Data For Update TeacherInterview
 * @param {*} body 
 * @param {*} teacherInterviewDetails 
 */
const fetchDataForUpdateTeacherInterview = (body) => new Promise((resolve, reject) => {
    teacherInterviewModel
        .find({ _id: { $in: body.teacherInterviewIds } })
        .then((teacherInterviewDetails) => {
            body.teacherInterviewDetails = teacherInterviewDetails
            resolve(body);
        })
        .catch((teacherInterviewFetchError) => {
            logger.error(`teacherInterviewFetchError - error ${teacherInterviewFetchError}`);
            reject(internalError);
        });
});

/**
 * This fn is to sendEmail
 * @param {*} body 
 * @param {*} status 
 */
const sendEmail = (body) => new Promise((resolve, reject) => {
    async.each(body.teacherInterviewDetails, (teacherInterviewDetail, callback) => {
        emailHelper.teacherInterviewAcknowledge(teacherInterviewDetail, body.status)
            .then(result => {
                logger.info(`sendEmail -Email  ${teacherInterviewDetail.email} send successfully `);
                callback();
            })
            .catch(sendEmailError => {
                logger.error(`sendEmail - error in sendEmail: ${teacherInterviewDetail.email}`);
                callback();
            })
    }, () => {
        resolve(body);
    })
});

/**
 * This fn is to update Teacher Interview Status
 * @param {*} teacherInterviewDetails 
 * @param {*} status 
 */
const updateTeacherInterviewStatus = (body) => new Promise((resolve, reject) => {
    const teacherInterviewIds = []
    body.teacherInterviewDetails.forEach(teacherInterview => {
        teacherInterviewIds.push(teacherInterview._id)
    });
    teacherInterviewModel.updateMany({ _id: { $in: teacherInterviewIds } },
        { status: body.status })
        .then(result => {
            logger.info(`updateTeacherInterviewStatus -teacher ${body.status} successfully`);
            resolve(body);
        })
        .catch(updateTeacherInterviewStatusError => {
            logger.error(`updateTeacherInterviewStatus - error in update TeacherInterview Status : ${JSON.stringify(updateTeacherInterviewStatusError, null, 2)}`);
            reject(internalErrorObj);
        })
});

/**
 *this fn is to Update the teacher interview status
 * @param {*} body 
 * @param {*} status 
 */
const updateTeacherInterview = (body, status) => new Promise((resolve, reject) => {
    try {
        body.status = status;
        validateUpdateTeacherInterviewBody(body)
        fetchDataForUpdateTeacherInterview(body)
            .then(updateTeacherInterviewStatus)
            .then(sendEmail)
            .then(updateResult => {
                const success = {
                    status: statusCode.Success,
                    message: 'teacher ' + status + ' successfully'
                };
                logger.info(`teacher ${status} successfully ${updateResult}`)
                resolve(success);
            })
            .catch(updateError => {
                logger.error(`updateTeacherInterviewStatus : Update Teacher Interview Status failed:${updateError}`)
                reject(updateError);
            });
    } catch (e) {
        logger.error(`updateTeacherInterviewStatus - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})

module.exports = {
    applyTeacher,
    getApplyTeacher,
    myAppliedStatus,
    updateTeacherInterview,
}