const logger = require("../../../lib/logger");
const config = require("../../../config/index");
const teacherModel = require("../../../models/database/teacher");
const teacherInterviewModel = require("../../../models/database/teacherInterview");
const userModel = require("../../../models/database/user");
const { statusCode, internalError } = require("../../../lib/constant");
const roleModel = require("../../../models/database/role");
const internalErrorObj = internalError;
const utils = require('../../../lib/utils');
const emailHelper = require("../../../lib/emailHelper");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (body) => {
  if (!body.email) { throw new Error("email not found"); }
  return true;
};

/**
 * This fn is to fetch data for step one
 * @param {Object} body 
 */
const fetchDataForSignup = (body) => new Promise((resolve, reject) => {
  userModel.findOne({ email: body.email })
    .then((user) => {
      if (user) {
        reject({
          status: statusCode.InvalidData,
          message: "Email already exist"
        })
      } else {
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

/**
 * 
 * @param {Object} role 
 */
const validateData = (role) => {
  if (!role) { new Error("role out of system") }
  return true;
}

/**
 * This fn is to fetch data for add
 * @param {Object} body 
 */
const fetchDataForAddUser = (body) => new Promise((resolve, reject) => {
  Promise.all(
    [roleModel.findOne({ code: config.role.TEACHER }),
    teacherInterviewModel.findOne({ email: body.email, userId: { '$exists': false } })
    ])
    .then((result) => {
      try {
        const [role, teacherInterview] = result;
        validateData(role);
        if (teacherInterview) {
          body.teacherInterview = teacherInterview;
        }
        body.role = role;
        resolve(body);
      } catch (error) {
        logger.error(`fetchDataForAddUser - error ${error}`);
        reject({
          status: statusCode.InvalidData,
          message: error.message
        });
      }
    })
    .catch((processError) => {
      logger.error(
        `fetchDataForAddUser - Error occurred in fetching data: ${JSON.stringify(
          processError,
          null,
          2
        )}`
      );
      reject(internalErrorObj);
    });
});


const validateUserDetails = (body) => {
  if (!body.password) { throw new Error("password not found"); }
  if (!body.confirmPassword) { throw new Error("confirmPassword not found"); }
  if (!body.name) { throw new Error("name not found"); }
  if (body.password !== body.confirmPassword) { throw new Error("password and confirmPassword not matching"); }
  return true;
}

/**
 * This function is to add data to user collection
 * @param {Object} body
 */
const addDataToUserCollection = (body) =>
  new Promise((resolve, reject) => {
    const userDetails = {
      email: body.email,
      password: utils.generateBcryptHash(body.password),
      roleId: body.role._id,
      contactNumber: "",
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
    let userMetaData = {
      userId: body.user._id,
      name: body.name,
    };
    if (body.teacherInterview) {
      userMetaData.teacherInterview = body.teacherInterview._id;
      userMetaData.name = body.teacherInterview.name;
    }
    let process = [teacherModel.addMultiple([userMetaData])];
    if (body.teacherInterview) {
      process.push(teacherInterviewModel.updateMany({ _id: { $in: [body.teacherInterview._id] } }, { userId: body.user._id }))
    }
    Promise.all(process)
      .then((result) => {
        const [userMetaDataResult] = result;
        logger.info(
          `addDataToRespectiveUserCollection - added data to user respective collection`
        );
        delete body.user.password;

        body.user.roleId = body.role;
        let [userMetaData] = userMetaDataResult;
        if (body.teacherInterview) { userMetaData.teacherInterview = body.teacherInterview; }
        const user = {
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

/**
 * This fn is to add the data to database
 * @param {Object} req 
 */
const addUser = (req) => new Promise((resolve, reject) => {
  const { body } = req;
  try {
    validateUserDetails(body);
    body.email = req.session.signup.email;
    fetchDataForAddUser(body)
      .then(addDataToUserCollection)
      .then(addDataToRespectiveUserCollection)
      .then(result => {
        logger.info(`addUser signup successful `);
        delete req.session.signup;
        req.session.user = result;
        resolve({
          status: statusCode.Success,
          message: 'Successfully sign up',
        });
      })
      .catch(error => reject(error))

  } catch (e) {
    logger.error(`addUser - error while parsing the body ${e}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: e.message,
    };
    reject(errObj);
  }
})

const validateVerifyOtpBody = (req) => {
  if (!req.session.signup.otpCode ) { throw new Error('Session expired') }
  if (!req.body.code ) { throw new Error('Insert Otp') }
  if (!req.session.signup.email) { throw new Error('Session expired') }
  return true;
}

/**
 * @param {Object} req
 */
const verifyAccountEmail = (req) => new Promise((resolve, reject) => {
  logger.info(`verifyAccountEmail - OTP verification started.`);
  try {
    validateVerifyOtpBody(req);
    if (req.session.signup.otpCode === req.body.code) {
      req.session.signup.verifiedOtp = true;
      resolve({
        status: statusCode.Success,
        message: 'OTP successfully validated'
      });
    } else {
      logger.error(`verifyAccountEmail - invalid otp`)
      reject({
        status: statusCode.InvalidData,
        message: 'Invalid OTP code'
      })
    }
  }
  catch (e) {
    logger.error(`verifyAccountEmail - error ${e}`)
    reject({
      status: statusCode.InvalidData,
      message: e.message
    })
  }
});

/**
 * This function is to verify account
 * @param {Object} body
 */
const sendVerifyAccountEmail = (body) => new Promise((resolve, reject) => {
   logger.info(`sendVerifyAccountEmail - OTP generation started.`);
    const otp = utils.generateOTP();
    emailHelper.verifyAccountEmail({
      email: body.email,
      otpCode: otp
    })
      .then(result => {
        logger.info(`sendVerifyAccountEmail -  email sent to verify account for ${body.email}`)
        resolve({ otpCode: otp })
      })
      .catch((error) => {
        reject(error)
      }); 
})


/**
 * signup using email
 * @param {Object} req
 */
const emailStepOneSignUp = (req) => new Promise((resolve, reject) => {
  try {
    const { body } = req;
    validateBody(body);
    fetchDataForSignup(body)
      .then(sendVerifyAccountEmail)
      .then((result) => {
        req.session.signup = {
          emailSignup: true,
          otpCode: result.otpCode,
          email: body.email
        };
        logger.info(
          `emailStepOneSignUp - email validated.`
        );
        resolve({
          status: statusCode.Success,
          message: 'Otp sent to your email '
        });
      }).
      catch((error) => {
        reject(error)
      });
  } catch (error) {
    logger.error(`emailStepOneSignUp - Error  ${error}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: error.message,
    };
    reject(errObj);
  }
});

module.exports = {
  emailStepOneSignUp,
  addUser,
  verifyAccountEmail
}