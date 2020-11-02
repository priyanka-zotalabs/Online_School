const boardModel = require('../../models/database/board');
const logger = require('../../lib/logger');
const { statusCode, internalError } = require('../../lib/constant');

/**
 * This function is to get the board data
 * @param {Object} params 
 */
const getBoards = () => new Promise((resolve, reject) => {
    boardModel.find({})
        .then(boards => {
            const response = {
                status: statusCode.Success,
                message: 'Boards fetch success!',
                data: boards,
            }
            resolve(response);
        })
        .catch(err => {
            logger.error(`getBoard - error getting the board ${JSON.stringify(err, null, 2)}`);
            reject(internalError)
        })
});

module.exports = {
    getBoards,
}