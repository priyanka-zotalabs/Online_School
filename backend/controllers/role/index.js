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
 * This function is to get the role data
 * @param {Object} params 
 */
const getRole = (params) => new Promise((resolve, reject) => {
    let process;
    if (params.code) {
        process = roleModel.findOne({ code: params.code });
    } else {
        process = roleModel.find({});
    }
    process
        .then(roles => {
            const response = {
                status: statusCode.Success,
                message: 'Role fetch success!',
                data: roles !== null ? roles : {},
            }
            resolve(response);
        })
        .catch(roleErr => {
            logger.error(`getRole - error getting the roles ${JSON.stringify(roleErr, null, 2)}`);
            reject(internalError)
        })
});

module.exports = {
    getRole
}