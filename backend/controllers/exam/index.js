const examModel = require('../../models/database/exam');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');

/**
 * This function is to get the exam data
 * @param {Object} params 
 */
const getExams = () => new Promise((resolve, reject) => {
    examModel.find({})
        .then(exams => {
            const response = {
                status: statusCode.Success,
                message: 'Exams fetch success!',
                data: exams,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getExams - error getting the exam ${JSON.stringify(err, null, 2)}`);
            reject(internalError)
        })
});

module.exports = {
    getExams,
}