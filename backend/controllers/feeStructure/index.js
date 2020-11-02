const _ = require("lodash");
const logger = require("../../lib/logger");
const feeStructureModel = require("../../models/database/feeStructure");
const { statusCode, internalError } = require("../../lib/constant");
const batchModel = require("../../models/database/batch");
const moment = require("moment");

const validateBody = (body) => {
  if (!body.batchId) {
    throw new Error("BatchId not found");
  }
  if (!body.name) {
    throw new Error("Fee structure name not found");
  }
  if (!body.amount) {
    throw new Error("Amount not found");
  }
};

const addFeeStructure = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`createFeeStructure - Create fees structure started`);
    try {
      const { body } = req;
      validateBody(body);

      let batchFeeStructureDetails = {
        name: body.name,
        amount: body.amount,
        tax: body.tax,
        totalAmount: body.totalAmount,
        currency: body.currency,
        numberOfInstallments: body.numberOfInstallments,
        durationBetweenInstallments:
          body.durationBetweenInstallments + " " + "Month/s",
        installmentCalculator: body.installmentCalculator,
      };
      batchModel
        .addBatchFeeStructure({ _id: body.batchId }, batchFeeStructureDetails)
        .then((result) => {
          logger.info(`createFeeStructure - fee structure creation successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully added fee structure",
          });
        })
        .catch((e) => {
          logger.error(
            `createFeeStructure - error while parsing the body ${e}`
          );
          const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
          };
          reject(errObj);
        });
      logger.info(`createFeeStructure - Create fees structure ended`);
    } catch (e) {
      logger.error(`createFeeStructure - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const validateUpdateBody = (body) => {
  if (!body.feeStructureId) {
    throw new Error("Fee structure Id not found");
  }
  if (!body.batchId) {
    throw new Error("BatchId not found");
  }
  if (!body.name) {
    throw new Error("Fee structure name not found");
  }
  if (!body.amount) {
    throw new Error("Amount not found");
  }
};

const updateFeeStructure = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`updateFeeStructure - Update fees structure started`);
    try {
      const { body } = req;
      validateUpdateBody(body);

      let batchFeeStructure = {
        name: body.name,
        amount: body.amount,
        tax: body.tax,
        totalAmount: body.totalAmount,
        currency: body.currency,
        numberOfInstallments: body.numberOfInstallments,
        durationBetweenInstallments:
          body.durationBetweenInstallments + " " + "Month/s",
        installmentCalculator: body.installmentCalculator,
      };

      let batchFeeStructureDetails = {};
      batchFeeStructureDetails["feeStructure.$"] = batchFeeStructure;

      batchModel
        .updateBatchFeeStructure(
          { _id: body.batchId, "feeStructure._id": body.feeStructureId },
          batchFeeStructureDetails
        )
        .then((result) => {
          logger.info(`updateFeeStructure - fee structure updation successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully updated batch fee structure",
          });
        })
        .catch((e) => {
          logger.error(
            `updateFeeStructure - error while parsing the body ${e}`
          );
          const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
          };
          reject(errObj);
        });
      logger.info(`updateFeeStructure - Update fees structure ended`);
    } catch (e) {
      logger.error(`updateFeeStructure - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const getFeeStructure = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`getFeeStructure - retriving fees structure started`);
    try {
      if (!req.params.id) {
        throw new Error("Fee structure Id not found");
      } else {
        feeStructureModel
          .findOne({ _id: req.params.id })
          .then((result) => {
            logger.info(`getFeeStructure - Fee structure retirval successful`);
            resolve({
              status: statusCode.Success,
              message: "Successfully retrived fee structure",
              data: result,
            });
          })
          .catch((e) => {
            logger.error(
              `createFeeStructure - error while parsing the body ${e}`
            );
            const errObj = {
              status: statusCode.InvalidData,
              message: e.message,
            };
            reject(errObj);
          });
      }
    } catch (error) {
      logger.error(`getFeeStructure - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: error.message,
      };
      reject(errObj);
    }
  });

const getAllFeeStructure = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`getAllFeeStructure - retriving fees structure started`);

    batchModel
      .find({ _id: req.params.batchId })
      .then((result) => {
        logger.info(`getAllFeeStructure - fee structures retrival successful`);
        resolve({
          status: statusCode.Success,
          message: "Successfully retrived all fee structure",
          data: result[0].feeStructure,
        });
      })
      .catch((e) => {
        logger.error(`getAllFeeStructure - error while parsing the body ${e}`);
        const errObj = {
          status: statusCode.InvalidData,
          message: e.message,
        };
        reject(errObj);
      });
  });

const validateDeleteBody = (body) => {
  if (!body.batchId) {
    throw new Error("Batch Id not found");
  }
  if (!body.feeStructureId) {
    throw new Error("Fee structure Id not found");
  }
};

const deleteFeeStructure = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`deleteFeeStructure - deletion of fees structure started`);
    try {
      const { body } = req;
      validateDeleteBody(body);

      batchModel
        .deleteBatchFeeStructure(
          { _id: body.batchId },
          { _id: body.feeStructureId }
        )
        .then((result) => {
          logger.info(
            `deleteFeeStructure - fee structures deletion successful`
          );
          resolve({
            status: statusCode.Success,
            message: "Successfully deleted fee structure",
          });
        })
        .catch((e) => {
          logger.error(
            `deleteFeeStructure - error while parsing the body ${e}`
          );
          const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
          };
          reject(errObj);
        });
    } catch (e) {
      logger.error(`deleteFeeStructure - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const validateUpdateStudentFeeStructureInBatchBody = (query) => {
  if (!query.batchId) {
    throw new Error("Batch Id not found");
  }
  if (!query.installmentId) {
    throw new Error("installment Id Id not found");
  }
};

const updateStudentFeeStructureInBatch = (req) =>
  new Promise((resolve, reject) => {
    logger.info(
      `updateStudentFeeStructure - student's fee structure updation started`
    );
    try {
      let { query } = req;
      validateUpdateStudentFeeStructureInBatchBody(query);
      let studentId = req.user.userMetaData.Student._id;

      batchModel
        .updateStudentFeeStructureInBatch(
          { _id: query.batchId },
          {
            "students.$[s].feeStructure.installmentCalculator.$[i].isPaid": true,
            "students.$[s].isFirstInstallmentPaid": true,
          },
          [{ "s.studentId": studentId }, { "i._id": query.installmentId }]
        )
        .then((result) => {
          logger.info(
            `updateStudentFeeStructure - student's fee structures updated successful`
          );
          resolve({
            status: statusCode.Success,
            message: "Successfully updated student's fee structure for payment",
          });
        })
        .catch((e) => {
          logger.error(
            `updateStudentFeeStructure - error while parsing the body ${e}`
          );
          const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
          };
          reject(errObj);
        });
    } catch (e) {
      logger.error(
        `updateStudentFeeStructure - error while parsing the body ${e}`
      );
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const getStudentFeeStructureFromBatch = (req) =>
  new Promise((resolve, reject) => {
    logger.info(
      `getStudentFeeStructureFromBatch - retriving fees structure for student started`
    );
    try {
      let courses = req.user.userMetaData.Student.courses;
      let batches = [];
      courses.forEach((course) => {
        course.batch = course.batchId._id;
        batches.push(course.batch)
      });
      let studentId = req.user.userMetaData.Student._id;
      batchModel
        .getStudentFeeStructureFromBatch({ _id: { $in: batches } },
          { studentId: studentId }
        )
        .then((results) => {
          if (!results.length) {
            logger.error(
              `getStudentFeeStructureFromBatch - no fee structure found`
            );
            reject({
              status: statusCode.InvalidData,
              message: "student doesnot exist"
            })
          } else {
            logger.info(
              `getStudentFeeStructureFromBatch - fee structures for student retrival successful`
            );
            let installmentStatus = [];
            results.forEach(result => {
              let allInstallments = [];
              result.students[0].feeStructure.installmentCalculator.forEach(installment => {
                if ((moment().diff(moment(installment.date), 'minutes') > 0) && installment.isPaid == false) {
                  installment.status = "late";
                }
                else if ((moment(installment.date).diff(moment(), 'minutes') > 0) && installment.isPaid == false) {
                  installment.status = "pending";
                }
                else if (installment.isPaid == true) {
                  installment.status = "paid";
                }
                allInstallments.push(installment);

              })
              result.currency=result.students[0].feeStructure.currency;
              delete result.students;
              result.installments = allInstallments;
              installmentStatus.push(result);
            })
            resolve({
              status: statusCode.Success,
              message: "Successfully retrived fee status for student.",
              data: installmentStatus,
            });
          }
        })
        .catch((e) => {
          logger.error(
            `getStudentFeeStructureFromBatch - error while parsing the body ${e}`
          );
          const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
          };
          reject(errObj);
        });
    }
    catch (error) {
      logger.error(
        `getStudentFeeStructureFromBatch - error while parsing the body ${e}`
      );
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const getStudentFeeDetailsForAdmin = (req) => new Promise((resolve, reject) => {
  try {
    const { query } = req;
    batchModel.getStudentFeeStructureFromBatch({ instituteId: query.instituteId, "students.studentId": query.studentId }, { studentId: query.studentId })
      .then((results) => {
        if (!results) {
          reject({
            status: statusCode.InvalidData,
            message: "student doesnot exist"
          })
        } else {
          let installmentStatus = [];
          results.forEach(result => {
            let allInstallments = []; 
            result.students[0].feeStructure.installmentCalculator.forEach(installment => {
              if ((moment().diff(moment(installment.date), 'minutes') > 0) && installment.isPaid == false) {
                installment.status = "late";
              }
              else if ((moment(installment.date).diff(moment(), 'minutes') > 0) && installment.isPaid == false) {
                installment.status = "pending";
              }
              else if (installment.isPaid == true) {
                installment.status = "paid";
              }
              allInstallments.push(installment);

            })
            result.currency=result.students[0].feeStructure.currency;
            delete result.students;
            result.installments = allInstallments;
            installmentStatus.push(result);
          })
          resolve({
            status: statusCode.Success,
            message: "Successfully retrived fee status for student.",
            data: installmentStatus,
          });
        }
      })
      .catch((e) => {
        logger.error(
          `getStudentFeeDetailsForAdmin - error while parsing the body ${e}`
        );
        const errObj = {
          status: statusCode.InvalidData,
          message: e.message,
        };
        reject(errObj);
      });
  }
  catch (error) {
    logger.error(
      `getStudentFeeDetailsForAdmin - error while parsing the body ${e}`
    );
    const errObj = {
      status: statusCode.InvalidData,
      message: e.message,
    };
    reject(errObj);
  }
})

module.exports = {
  addFeeStructure,
  getFeeStructure,
  getAllFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  updateStudentFeeStructureInBatch,
  getStudentFeeStructureFromBatch,
  getStudentFeeDetailsForAdmin
};
