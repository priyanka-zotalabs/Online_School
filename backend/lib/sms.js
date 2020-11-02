const axios = require('axios');
const { sms } = require('../config/index');
const logger = require('./logger');

/**
 * This fn is to send the OTP
 * @param {*} data 
 */
const sendOTP = (data) => new Promise((resolve, reject) => {
    const message = `YOUR OTP for application is ${data.otp}`;
    axios.get(`${sms.basePath}?apiKey=${sms.apiKey}&sender=${sms.sender}&numbers=${data.contactNumber}&message=${message.split(' ').join('+')}`)
        .then((result) => {
            if (result.data.status === 'success') {
                logger.info(`sendOTP - success in sending`);
                resolve(true)
            } else {
                logger.error(`sendOTP - error in sending ${result}`);
                reject(false)
            }
        })
        .catch((error) => {
            logger.error(`sendOTP - error ${error}`);
            reject(false)
        })
})

module.exports = {
    sendOTP,
}