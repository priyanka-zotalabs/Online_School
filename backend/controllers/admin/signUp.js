const logger = require("../../lib/logger");
const config = require("../../config/index");
const adminModel = require("../../models/database/admin");
const instituteModel = require("../../models/database/institute");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const roleModel = require("../../models/database/role");
const internalErrorObj = internalError;
const utils = require('../../lib/utils');
const emailHelper = require('../../lib/emailHelper');
const institute = require("../../microservices/databaseConnector/models/institute");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (body) => {
  if (!body.email) { throw new Error("email not found"); }
  // if (!body.name) { throw new Error("name not found"); }
  // if (!body.contactNumber) { throw new Error("contactNumber not found"); }
  return true;
};

/**
 * This fn is for Validate Data
 * @param {Object} role 
 */
const validateData = (role, user) => {
  if (!role) { new Error("role out of system") }
  if (user) { new Error("user already Exist") }
  // if (institute) { new Error("user already Exist") }
  return true;
}

/**
 * This fn is to fetch data for   Admin Signup
 * @param {Object} body 
 */
const fetchDataForAdminSignUp = (body) => new Promise((resolve, reject) => {
  Promise.all(
    [
      roleModel.findOne({ code: config.role.ADMIN }),
      userModel.findOne({ email: body.email }),
      // instituteModel.findOne({ email: body.email }),
    ])
    .then((result) => {
      try {
        const [role, user] = result;
        validateData(role, user);
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
      instituteId: body.institute._id,
      email: body.email,
      password: utils.generateBcryptHash(body.password),
      roleId: body.role._id,
      // contactNumber: body.contactNumber,
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
const addDataToInstituteCollection = (body) =>
  new Promise((resolve, reject) => {
    let instituteData = {
      name: body.name || "",
      email: body.email,
      imageUrl: body.imageUrl || "",
      contactNumber: body.contactNumber || "",
      aboutMe: body.aboutMe || "",
      subject: body.subject || "",
      board: body.board || "",
      website: body.website || "",
      experience: body.experience || "",
      location: body.location || "",
      brochureUrl: body.brochureUrl || "",
    };
    let process = [
      instituteModel.addMultiple([instituteData]),
    ];
    Promise.all(process)
      .then((result) => {
        const [instituteResult] = result;
        logger.info(
          `addDataToRespectiveUserCollection - added data to user respective collection`
        );
        [body.institute] = instituteResult;
        resolve(body);
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

const addDataToAdminCollection = (body) =>
  new Promise((resolve, reject) => {
    let userMetaData = {
      userId: body.user._id,
      instituteId: body.institute._id,
      name: body.name || "",
      email: body.email,
      imageUrl: body.imageUrl || "",
      contactNumber: body.contactNumber || "",
      aboutMe: body.aboutMe || "",
      subject: body.subject || "",
      board: body.board || "",
      website: body.website || "",
      experience: body.experience || "",
      brochureUrl: body.brochureUrl || "",
    };
    let process = [
      adminModel.addMultiple([userMetaData]),
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
 * adminSignUp
 * @param {Object} req
 */
const adminSignUp = (body) => new Promise((resolve, reject) => {
  try {
    // if(!body.password){
    // body.password="Admin@123"
    // }
    validateBody(body);
    if (!body.password) {
      body.password = "Admin@123"
    }
    fetchDataForAdminSignUp(body)
      .then(addDataToInstituteCollection)
      .then(addDataToUserCollection)
      .then(addDataToAdminCollection)
      .then((result) => {
        logger.info(
          `adminSignUp - adminSignUp Done.`
        );
        resolve({
          status: statusCode.Success,
          message: 'adminSignUp Done ! ',
          Data: result
        });
      }).
      catch((error) => {
        reject(error)
      });
  } catch (error) {
    logger.error(`adminSignUp - Error  ${error}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: error.message,
    };
    reject(errObj);
  }
});


module.exports = {
  adminSignUp,
}