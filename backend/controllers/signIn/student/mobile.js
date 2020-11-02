const logger = require("../../../lib/logger");
const config = require("../../../config/index");
const studentModel = require("../../../models/database/student");
const userModel = require("../../../models/database/user");
const { statusCode, internalError } = require("../../../lib/constant");
const utils = require("../../../lib/utils");
const sms = require("../../../lib/sms");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (body) => {
  if (!body.contactNumber) { throw new Error("contactNumber not found"); }
  if (!body.countryCode) { throw new Error("countryCode not found"); }
  return true;
};

/**
 * This fn is to get data for mobile signIn step one
 * @param {Object} body 
 */
const fetchDataForSignIn = (body) => new Promise((resolve, reject) => {
  userModel.findOne({ contactNumber: `${body.countryCode}-${body.contactNumber}` })
    .then((user) => {
      if (!user || user.roleId.code != config.role.STUDENT) {
        reject({
          status: statusCode.InvalidData,
          message: "Invalid Contact number"
        })
      } else {
        studentModel.findOne({ userId: user._id })
          .then((student) => {
            delete user.password;
            let userMetaData = student;
            delete userMetaData.userId;
            let response = {
              ...user,
              userMetaData,
            }
            resolve(response);
          })
          .catch((err) => {
            logger.error(
              `fetchDataForSignIn - Error occurred in fetching data: ${JSON.stringify(
                err,
                null,
                2
              )}`
            );
            reject(internalError);
          })
      }

    })
    .catch((processError) => {
      logger.error(
        `fetchDataForSignIn - Error occurred in fetching data: ${JSON.stringify(
          processError,
          null,
          2
        )}`
      );
      reject(internalError);
    });
});


const validateVerifyOtpBody = (req) => {
  if (!req.session.signIn.otpCode) { throw new Error('Please resend the OTP request') }
  if (!req.session.signIn.user) { throw new Error('Please resend the OTP request') }
  if (!req.body.code) { throw new Error('Enter the OTP') }
  return true;
}

/**
 * @param {Object} req
 */
const verifyOTP = (req) => new Promise((resolve, reject) => {
  logger.info(`verifyOTP - OTP verification started.`);
  try {

    validateVerifyOtpBody(req);
    if (req.session.signIn.otpCode === req.body.code) {
      req.session.user = req.session.signIn.user;
      delete req.session.signIn
      resolve({
        status: statusCode.Success,
        message: 'OTP successfully validated'
      });
    } else {
      logger.error(`verifyOTP - invalid otp`)
      reject({
        status: statusCode.InvalidData,
        message: 'Invalid OTP code'
      })
    }
  }
  catch (e) {
    logger.error(`verifyOTP - error ${e}`)
    reject({
      status: statusCode.InvalidData,
      message: e.message
    })
  }
});

/**
 * send otp using mobile number
 * @param {Object} body
 */
const sendOTP = (body) => new Promise((resolve, reject) => {
  logger.info(`sendOTP - OTP generation started.`);
  const otp = utils.generateOTP();
  if (config.sms.enable === "false") {
    resolve({ ...body, otpCode: '9999' });
  } else {
    sms.sendOTP({ contactNumber: body.contactNumber, otp })
      .then(() => {
        logger.info(`sendOTP - OTP send on mobile number `);
        resolve({ ...body, otpCode: otp });
      })
      .catch(() => {
        logger.error(
          `sendOTP - Error occured while sending mobile number OTP.`
        );
        reject({
          status: statusCode.Failure,
          message: 'Failed to send OTP, try again!'
        });
      })
  }
});

/**
 * signIn using mobile number send otp only
 * @param {Object} req
 */
const mobileStepOneSignIn = (req) => new Promise((resolve, reject) => {
  try {
    const { body } = req;
    validateBody(body);
    fetchDataForSignIn(body)
      .then(sendOTP)
      .then((result) => {
        req.session.signIn = {
          mobileSignIn: true,
          otpCode: result.otpCode,
          user: result
        };
        logger.info(
          `mobileStepOneSignIn - OTP send on mobile number of user.`
        );
        resolve({
          status: statusCode.Success,
          message: 'OTP send successfully'
        });
      }).
      catch((error) => {
        reject(error)
      });
  } catch (error) {
    logger.error(`mobileStepOneSignIn - Error in mobile OTP send ${error}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: e.message,
    };
    reject(errObj);
  }
});

module.exports = {
  mobileStepOneSignIn,
  verifyOTP,
}