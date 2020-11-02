const logger = require("../../lib/logger");
const config = require("../../config/index");
const teacherModel = require("../../models/database/teacher");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const roleModel = require("../../models/database/role");
const internalErrorObj = internalError;
const utils = require('../../lib/utils');
const emailHelper = require('../../lib/emailHelper');

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (body) => {
  if (!body.email) { throw new Error("email not found"); }
  if (!body.name) { throw new Error("name not found"); }
  if (!body.contactNumber) { throw new Error("contactNumber not found"); }
  return true;
};

/**
 * This fn Is for Validate the Featch DATA
 * @param {*} role 
 * @param {*} user 
 */
const validateData = (role, user) => {
  if (!role) { throw new Error("role out of system") }
  if (user ) { throw new Error("user already Exist") }
  return true;
}


/**
 * This fn is to fetch data for add  User
 * @param {Object} body 
 */
const fetchDataForTeacherOnboarding = (body) => new Promise((resolve, reject) => {
  Promise.all(
    [roleModel.findOne({ code: config.role.TEACHER }),
    userModel.findOne({ email: body.email }),
    // teacherModel.findOne({ email: body.email, userId: { '$exists': false } })
    ])
    .then((result) => {
      try {
        const [role, user] = result;
        validateData(role,user);
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


/**
 * This function is to add data to user collection
 * @param {Object} body
 */
const addDataToUserCollection = (body) =>
  new Promise((resolve, reject) => {
    const userDetails = {
      email: body.email,
      instituteId:body.instituteId,
      password: utils.generateBcryptHash(body.password),
      roleId: [body.role._id],
      contactNumber: body.contactNumber,
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
      instituteId:body.instituteId,
      name: body.name,
      imageUrl: "",
      contactNumber: body.contactNumber,
      aboutMe: "",
      subject: "",
      board: "",
      qualification: "",
      experience: "",
      location: "",
      linkedInUrl: "",
      resumeUrl: "",
    };
    let process = [
      teacherModel.addMultiple([userMetaData]),
      emailHelper.teacherOnboardedEmail(body)
    ];
    Promise.all(process)
      .then((result) => {
        const [userMetaDataResult, emailsend] = result;
        logger.info(
          `addDataToRespectiveUserCollection - added data to user respective collection`
        );
        delete body.user.password;
        body.user.roleId = body.role;
        let [userMetaData] = userMetaDataResult;
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
 * teacherOnboarding
 * @param {Object} req
 */
const teacherOnboarding = (body, user) => new Promise((resolve, reject) => {
  try {
    body.password="Teacher@123"
    body.instituteId=user.instituteId._id;
    validateBody(body);
    fetchDataForTeacherOnboarding(body)
      .then(addDataToUserCollection)
      .then(addDataToRespectiveUserCollection)
      .then((result) => {
        logger.info(
          `teacherOnboarding - Teacher Onboarded.`
        );
        resolve({
          status: statusCode.Success,
          message: 'Teacher Onborded ! ',
          Data:result
        });
      }).
      catch((error) => {
        reject(error)
      });
  } catch (error) {
    logger.error(`teacherOnboarding - Error  ${error}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: error.message,
    };
    reject(errObj);
  }
});


module.exports = {
  teacherOnboarding,
  // teacherChengePassword,
}