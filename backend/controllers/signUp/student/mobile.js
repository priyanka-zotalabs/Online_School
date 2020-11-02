const logger = require("../../../lib/logger");
const config = require("../../../config/index");
const studentModel = require("../../../models/database/student");
const userModel = require("../../../models/database/user");
const { statusCode, internalError } = require("../../../lib/constant");
const roleModel = require("../../../models/database/role");
const boardModel = require("../../../models/database/board")
const gradeModel = require("../../../models/database/grade")
const internalErrorObj = internalError;
const utils = require("../../../lib/utils");
const sms = require("../../../lib/sms");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */

const validateBody = (body) => {
  if (!body.contactNumber) {
    throw new Error("contactNumber not found");
  }
  if (!body.countryCode) {
    throw new Error("countryCode not found");
  }
  return true;
};

const validateDataForSignUp = (board, grade, role) => {
  if (!grade) { throw new Error('grade outside the system'); }
  if (!board) { throw new Error('board outside the system'); }
  if (!role) { throw new Error('role outside the system'); }
  return true;
}

/**
 * This fn is to get data for mobile signup step one
 * @param {Object} body 
 */
const fetchDataForSignup = (body) => new Promise((resolve, reject) => {
  userModel.findOne({ contactNumber: `${body.countryCode}-${body.contactNumber}` })
    .then((student) => {
      if (student) {
        reject({
          status: statusCode.InvalidData,
          message: "Contact number already exist"
        })
      }
      else {
        resolve(body);
      }
    })
    .catch((processError) => {
      logger.error(
        `fetchDataForSignup - Error occurred in fetching data: ${JSON.stringify(
          processError,
          null,
          2
        )}`
      );
      reject(internalErrorObj);
    });
});


const validateVerifyOtpBody = (req) => {
  if (!req.session.signup.otpCode) { throw new Error('Please resend the OTP request') }
  if (!req.session.signup.mobile) { throw new Error('Please resend the OTP request') }
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
    if (req.session.signup.otpCode === req.body.code) {
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
 * prepare mobile number for input
 * @param {Object} body
 */
const getMobileNumber = (body) => {
  return body.countryCode + '-' + body.contactNumber;
};

/**
 * send otp using mobile number
 * @param {Object} body
 */
const sendOTP = (body) => new Promise((resolve, reject) => {
  logger.info(`sendOTP - OTP generation started.`);
  const otp = utils.generateOTP();
  if (config.sms.enable === "false") {
    resolve({ otpCode: '9999' });
  } else {
    const mobileNumber = getMobileNumber(body);
    sms.sendOTP({ contactNumber: mobileNumber, otp })
      .then(() => {
        logger.info(`sendOTP - OTP send on mobile number `);
        resolve({ otpCode: otp });
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
 * signup using mobile number send otp only
 * @param {Object} req
 */

const mobileStepOneSignUp = (req) => new Promise((resolve, reject) => {
  try {
    const { body } = req;
    validateBody(body);
    fetchDataForSignup(body)
      .then(sendOTP)
      .then((result) => {
        req.session.signup = {
          mobileSignup: true,
          otpCode: result.otpCode,
          mobile: `${body.countryCode}-${body.contactNumber}`
        };
        logger.info(
          `mobileSignUp - OTP send on mobile number of new user.`
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
    logger.error(`mobileSignUp - Error in mobile OTP send ${error}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: e.message,
    };
    reject(errObj);
  }
});

const validateUserDetails = (body) => {
  if (!body.name) { throw new Error("name not found"); }
  if (!body.boardCode) { throw new Error("board not found"); }
  if (!body.gradeCode) { throw new Error("grade not found"); }
  return true;
}

/**
 * This fn is to fetch before add in db
 * @param {Object} body 
 */
const fetchDataForUser = (body) => new Promise((resolve, reject) => {
  const process = [
    gradeModel.findOne({ code: body.gradeCode }),
    boardModel.findOne({ code: body.boardCode }),
    roleModel.findOne({ code: config.role.STUDENT }),
  ];
  Promise.all(process)
    .then((processRes) => {
      try {
        const [grade, board, role] = processRes;
        validateDataForSignUp(grade, board, role);
        body.role = role;
        body.grade = grade;
        body.board = board;
        resolve(body);
      } catch (error) {
        logger.error(`fetchDataForUser - error${error}`);
        reject({
          status: statusCode,
          message: error.message
        });
      }
    })
    .catch((processError) => {
      logger.error(
        `fetchDataForUser - Error occurred in fetching data: ${JSON.stringify(
          processError,
          null,
          2
        )}`
      );
      reject(internalErrorObj);
    });
});

const addMobileUser = (req) => new Promise((resolve, reject) => {
  const { body } = req;
  validateUserDetails(body);
  try {
    body.mobile = req.session.signup.mobile;
    fetchDataForUser(body)
      .then(addDataToUserCollection)
      .then(addDataToRespectiveUserCollection)
      .then(result => {
        delete req.session.signup;
        req.session.user = result;
        logger.info(`addMobileUser signup successful`);
        resolve({
          status: statusCode.Success,
          message: 'Successfully sign up',
        });
      })
      .catch(error => reject(error))
  } catch (e) {
    logger.error(`addMobileUser - error while parsing the body ${e}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: e.message,
    };
    reject(errObj);
  }
})

/**
 * This function is to add data to user collection
 * @param {Object} body
 */
const addDataToUserCollection = (body) =>
  new Promise((resolve, reject) => {
    const userDetails = {
      email: "",
      password: "",
      contactNumber: body.mobile,
      roleId: body.role._id
    };
    userModel
      .addMultiple([userDetails])
      .then((userResult) => {
        logger.info(`addDataToUserCollection - user data added successfully`);
        [body.user] = userResult;
        resolve(body);
      })
      .catch((userError) => {
        logger.error(
          `addDataToUserCollection - error:${JSON.stringify(
            userError,
            null,
            2
          )}`
        );
        reject(internalErrorObj);
      });
  });


/**
 * This function is to add data to respective user collections
 * @param {Object} body
 */
const addDataToRespectiveUserCollection = (body) =>
  new Promise((resolve, reject) => {
    const userMetaData = {
      userId: body.user._id,
      name: body.name,
      gradeId: body.grade._id,
      boardId: body.board._id,
    };
    studentModel
      .addMultiple([userMetaData])
      .then((userMetaDataResult) => {
        logger.info(
          `addDataToRespectiveUserCollection - added data to user respective collection`
        );
        delete body.user.password;
        body.user.roleId = body.role;
        const [userMetaData] = userMetaDataResult;
        userMetaData.gradeId = body.grade;
        userMetaData.boardId = body.board;
        let user = {
          ...body.user,
          userMetaData
        }
        resolve(user);
      })
      .catch((userMetaDataError) => {
        logger.error(
          `addDataToRespectiveUserCollection - error in adding data to user respective collection: ${JSON.stringify(
            userMetaDataError,
            null,
            2
          )}`
        );
        reject(internalErrorObj);
      });
  });


module.exports = {
  mobileStepOneSignUp,
  verifyOTP,
  addMobileUser
}