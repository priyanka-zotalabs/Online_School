const instituteModel = require('../../models/database/institute');
const userModel = require('../../models/database/user');

const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');

/**
 * This function is to get the institute data
 * @param {Object} params 
 */
const getinstitutes = (user) => new Promise((resolve, reject) => {
    const instituteId = user.instituteId._id;
    instituteModel.findOne({ _id: instituteId })
        .then(institutes => {
            const response = {
                status: statusCode.Success,
                message: 'institutes fetch success!',
                data: institutes,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getinstitute - error getting the institute ${JSON.stringify(err, null, 2)}`);
            reject(internalError)
        })
});

module.exports = {
    getinstitutes,
}