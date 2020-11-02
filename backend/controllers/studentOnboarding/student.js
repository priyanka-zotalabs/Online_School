const logger = require("../../lib/logger");
const config = require("../../config/index");
const studentModel = require("../../models/database/student");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const roleModel = require("../../models/database/role");
const courseModel = require("../../models/database/courseModules");
const batchModel = require("../../models/database/batch");

const internalErrorObj = internalError;
const utils = require('../../lib/utils');
const emailHelper = require('../../lib/emailHelper');
const courseModulesModel = require("../../models/database/courseModules");
const student = require("../../models/database/student");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (body) => {
  // if (!body.email) { throw new Error("email not found"); }
  if (!body.name) { throw new Error("name not found"); }
  if (!body.contactNumber) { throw new Error("contactNumber not found"); }
  // if (!body.courseIds) { throw new Error("courseIds not found"); }
  // if (!body.feeStructure) { throw new Error("feeStructure not found"); }
  return true;
};

/**
 * This fn Is for Validate the Featch DATA
 * @param {*} role 
 * @param {*} user 
 */
const validateData = (role, user) => {
  if (!role) { throw new Error("role out of system") }
  if (user) { throw new Error("user already Exist") }
  return true;
}


/**
 * This fn Is for Validate the Featch DATA
 * @param {*} course 
 * @param {*} batch 
 */
const validateCourseRegisterData = (course, batch) => {
  if (!course) { throw new Error("course out of system") }
  if (!batch) { throw new Error("batch out of system") }
  return true;
}


/**
 * This fn is to fetch data for add  User
 * @param {Object} body 
 */
const fetchDataForstudentOnboarding = (body) => new Promise((resolve, reject) => {
  let process = [
    roleModel.findOne({ code: config.role.student }),
    userModel.findOne({ contactNumber: body.contactNumber }),
  ];
  Promise.all(process)
    .then((result) => {
      try {
        const [role, user] = result;
        validateData(role, user);
        body.role = role;
        resolve(body);
      } catch (Error) {
        logger.error(`fetchDataForAddUser - error ${Error}`);
        reject({
          status: statusCode.InvalidData,
          message: Error.message
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
      instituteId: body.instituteId,
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
    const courseDetail = [];
    const allcourses = body.courses;
    allcourses.forEach(course => {
      const courseDetails = {
        courseId: course.courseId,
        batchId: course.batchId,
        // feeStructureId: course.feeStructureId,
        // courseName: course.courseName,
        // batchName: course.batchName,
        // feeStructureName: course.feeStructureName
      }
      courseDetail.push(courseDetails)
      console.log(courseDetail)
    });

    let userMetaData = {
      userId: body.user._id,
      instituteId: body.instituteId,
      name: body.name,
      imageUrl: "",
      contactNumber: body.contactNumber,
      courses: courseDetail || "",
      // feeStructure: body.feeStructure || "",
      board: "",
      discount: body.discount || "",
      class: "",
      location: "",
      school: "",
    };

    let process = [
      studentModel.addMultiple([userMetaData]),
      // emailHelper.studentOnboardedEmail(body)
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
* This function is to get the student data
* @param {Object} params 
*/
const studentRegisterCourse = (courseData, studentId, body) => new Promise((resolve, reject) => {
  let process = [];
  process = batchModel.findOne({ _id: courseData.batchId });
  process
    .then(batch => {
      // const feeStructures = batch.feeStructure;
      const students = {
        studentId: studentId,
        name: body.name,
      };
      // let feeStructureDetails = {}
      // feeStructures.forEach(structure => {
      //   if (structure._id == courseData.feeStructureId) {
      //     feeStructureDetails = {}
      //     feeStructureDetails.name = structure.name
      //     feeStructureDetails.name = structure.name,
      //     feeStructureDetails.amount = structure.amount,
      //     feeStructureDetails.tax = structure.tax,
      //     feeStructureDetails.totalAmount = structure.totalAmount,
      //     feeStructureDetails.currency = structure.currency,
      //     feeStructureDetails.numberOfInstallments = structure.numberOfInstallments,
      //     feeStructureDetails.durationBetweenInstallments = structure.durationBetweenInstallments,
      //       // feeStructureDetails.amount = parseInt(structure.amount),
      //       // feeStructureDetails.tax = parseInt(structure.tax),
      //       // feeStructureDetails.totalAmount = parseInt(structure.totalAmount),
      //       // feeStructureDetails.numberOfInstallments = parseInt(structure.numberOfInstallments),
      //       // feeStructureDetails.durationBetweenInstallments = parseInt(structure.durationBetweenInstallments),
      //       installmets = structure.installmentCalculator

      //     installmets.forEach(installment => {
      //       delete installment._id;
      //     })
      //     feeStructureDetails.installmentCalculator = installmets
      //   }
      // });
      // students.feeStructure = feeStructureDetails
      batchModel
        .addStudent({ _id: batch._id }, students)
        .then(resolve(batch))
    })
    .catch(studentErr => {
      logger.error(`getstudent - error getting the students ${JSON.stringify(studentErr, null, 2)}`);
      reject(internalError)
    })
});



/**
 * studentOnboarding
 * @param {Object} req
 */
const studentOnboarding = (body, user) => new Promise((resolve, reject) => {
  try {
    body.password = "Student@123"
    body.instituteId = user.instituteId._id;
    validateBody(body);
    fetchDataForstudentOnboarding(body)
      .then(addDataToUserCollection)
      .then(addDataToRespectiveUserCollection)
      .then((studentData) => {
        body.studentData = studentData
        studentUserId = studentData._id
        studentId = studentData.userMetaData._id
        const allCourses = body.courses
        allCourses.forEach(courseDatas => {
          courseData = courseDatas
          studentRegisterCourse(courseData, studentId, body)
        });
      })
      .then((studentData) => {
        logger.info(
          `studentOnboarding - student Onboarded.`
        );
        resolve({
          status: statusCode.Success,
          message: 'student Onborded ! ',
          Data: studentData
        });
      }).
      catch((error) => {
        reject(error)
      });
  } catch (error) {
    logger.error(`studentOnboarding - Error  ${error}`);
    const errObj = {
      status: statusCode.InvalidData,
      message: error.message,
    };
    reject(errObj);
  }
});


module.exports = {
  studentOnboarding,
  // studentChengePassword,
}