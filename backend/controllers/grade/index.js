const _ = require('lodash');
const gradeModel = require('../../models/database/grade');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');

/**
 * This function is to get the grade data
 * @param {Object} params 
 */
const getGrades = () => new Promise((resolve, reject) => {
    gradeModel.find({})
        .then(grades => {
            const response = {
                status: statusCode.Success,
                message: 'Grade fetch success!',
                data: grades,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getGrades - error getting the Grades ${err}`);
            reject(internalError)
        })
});

module.exports = {
    getGrades,
}