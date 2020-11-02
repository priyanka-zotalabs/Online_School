const _ = require("lodash");
const logger = require("../../lib/logger");
const batchModel = require("../../models/database/batch");
const { statusCode, internalError } = require("../../lib/constant");
const moment = require('moment');
const testModel = require("../../models/database/test");
const courseModel = require("../../models/database/courseModules")


const validateBody = (body) => {
  if (!body.courseId) {
    throw new Error("course not found");
  }
  if (!body.name) {
    throw new Error("name not found");
  }
  if (!body.teacher) {
    throw new Error("teacher not found");
  }
  if (!body.startDate) {
    throw new Error("startDate not found");
  }
  if (!body.endDate) {
    throw new Error("endDate not found");
  }
};

const addDataToBatchCollection = (body) =>
  new Promise((resolve, reject) => {
    let batchDetails = {
      courseId: body.courseId,
      instituteId: body.instituteId,
      name: body.name,
      teachers: body.teacher,
      startDate: moment(body.startDate, "DD-MM-YYYY").utc(),
      endDate: moment(body.endDate, "DD-MM-YYYY").utc(),
    };
    batchDetails.duration = batchDetails.endDate.diff(
      batchDetails.startDate,
      "months"
    );
    batchModel
      .addMultiple(batchDetails)
      .then((batchResult) => {
        logger.info(`addDataToBatchCollection - batch added successfully`);
        resolve(batchResult);
      })
      .catch((batchError) => {
        logger.error(
          `addDataToTestCollection - error:${JSON.stringify(
            batchError,
            null,
            2
          )}`
        );
        reject(internalError);
      });
  });

const createBatch = (req) =>
  new Promise((resolve, reject) => {
    try {
      const { body } = req;
      body.instituteId = req.user.instituteId._id;
      validateBody(body);
      addDataToBatchCollection(body)
        .then((result) => {
          logger.info(`createBatch - batch creation successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully created batch",
          });
        })
        .catch((error) => reject(error));
    } catch (e) {
      logger.error(`createBatch - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const validateEditBody = (body) => {
  if (!body.batchId) {
    throw new Error("batch not found");
  }
  if (!body.courseId) {
    throw new Error("course not found");
  }
  if (!body.name) {
    throw new Error("name not found");
  }
  if (!body.teacher) {
    throw new Error("teacher not found");
  }
  if (!body.startDate) {
    throw new Error("startDate not found");
  }
  if (!body.endDate) {
    throw new Error("endDate not found");
  }
};

const updateDataToBatchCollection = (body) =>
  new Promise((resolve, reject) => {
    batchDetails = {
      courseId: body.courseId,
      instituteId: body.instituteId,
      name: body.name,
      teachers: body.teacher,
      startDate: moment(body.startDate, "DD-MM-YYYY").utc(),
      endDate: moment(body.endDate, "DD-MM-YYYY").utc(),
    };
    batchDetails.duration = batchDetails.endDate.diff(
      batchDetails.startDate,
      "months"
    );
    batchModel
      .update({ _id: body.batchId }, batchDetails)
      .then((batchResult) => {
        logger.info(`updateDataToBatchCollection - batch edited successfully`);
        resolve(batchResult);
      })
      .catch((batchError) => {
        logger.error(
          `updateDataToTestCollection - error:${JSON.stringify(
            batchError,
            null,
            2
          )}`
        );
        reject(internalError);
      });
  });

const editBatch = (req) =>
  new Promise((resolve, reject) => {
    try {
      const { body } = req;
      body.instituteId = req.user.instituteId._id;
      validateEditBody(body);
      updateDataToBatchCollection(body)
        .then((result) => {
          logger.info(`editBatch - batch updation successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully updated batch",
          });
        })
        .catch((err) => {
          logger.error(`getbatch - error getting the batch ${err}`);
          reject(internalError);
        });
    } catch (e) {
      logger.error(`editBatch - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const formatBatchDetailsList = (batches) => {
  let batchesDetails = [];
  batches.forEach((batch) => {
    batch.course = {
      courseId: batch.courseId._id,
      name: batch.courseId.name
    };
    let teachers = [];
    batch.teachers.forEach((teacher) => {
      teacherId = teacher.teacherId._id;
      name = teacher.teacherId.name;
      delete teacher.teacherId;
      teachers.push({
        teacherId: teacherId,
        name: name
      });
    })
    batch.teachers = teachers;
    delete batch.courseId;
    batchesDetails.push(batch);
  });
  return batchesDetails;
};


const getAllBatches = (req) =>
  new Promise((resolve, reject) => {
    try {
      const instituteId = req.user.instituteId._id;
      batchModel
        .find({ instituteId: instituteId })
        .then((batches) => {
          const allBatches = formatBatchDetailsList(batches);
          const response = {
            status: statusCode.Success,
            message: "Batches fetch success!",
            data: allBatches,
          };
          resolve(response);
        })
        .catch((err) => {
          logger.error(`getAllBatches - error getting batches${err}`);
          reject(internalError);
        });
    }
    catch (e) {
      logger.error(`getAllBatches - error ${e}`);
      reject({
        status: statusCode.InvalidData,
        message: e.message,
      });
    }
  });

const validateQuery = (query) => {
  if (!query.batchId) {
    throw new Error("batchId not found");
  }
  if (query.batchId.length != 24) {
    throw new Error("batchId invalid");
  }
};

const getBatch = (query) =>
  new Promise((resolve, reject) => {
    try {
      validateQuery(query);
      batchModel
        .findOne({ _id: query.batchId })
        .then((batch) => {
          if (!batch) {
            reject({
              status: statusCode.InvalidData,
              message: "batch doesnot exist",
            });
          } else {
            batch.course = {
              courseId: batch.courseId._id,
              name: batch.courseId.name
            };
            let teachers = [];
            batch.teachers.forEach((teacher) => {
              teacherId = teacher.teacherId._id;
              name = teacher.teacherId.name;
              delete teacher.teacherId;
              teachers.push({
                teacherId: teacherId,
                name: name
              });
            })
            batch.teachers = teachers;
            delete batch.courseId;
            const response = {
              status: statusCode.Success,
              message: "batch fetch success!",
              data: batch,
            };
            resolve(response);
          }
        })
        .catch((err) => {
          logger.error(`getbatch - error getting the batch ${err}`);
          reject(internalError);
        });
    } catch (e) {
      logger.error(`getbatch - error ${e}`);
      reject({
        status: statusCode.InvalidData,
        message: e.message,
      });
    }
  });

const validateStudentBody = (body) => {
  if (!body.batchId) {
    throw new Error("batch not found");
  }
  if (!body.students) {
    throw new Error("student not found");
  }
};

const addStudentDataToBatchCollection = (body) =>
  new Promise((resolve, reject) => {
    const studentDetails = {
      students: body.students,
    };
    batchModel
      .addStudent({ _id: body.batchId }, studentDetails)
      .then((batchResult) => {
        logger.info(
          `updateStudentDataToBatchCollection - student added successfully`
        );
        resolve(batchResult);
      })
      .catch((batchError) => {
        logger.error(
          `updateStudentDataToTestCollection - error:${JSON.stringify(
            batchError,
            null,
            2
          )}`
        );
        reject(internalError);
      });
  });

const addStudent = (body) =>
  new Promise((resolve, reject) => {
    try {
      validateStudentBody(body);
      addStudentDataToBatchCollection(body)
        .then((result) => {
          logger.info(`addStudent - student added successful`);
          resolve({
            status: statusCode.Success,
            message: "Successfully added student",
          });
        })
        .catch((error) => reject(error));
    } catch (e) {
      logger.error(`addStudent - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const validateDeleteQuery = (query) => {
  if (!query.batchId) {
    throw new Error("batch not found");
  }
  if (!query.studentId) {
    throw new Error("student not found");
  }
};

const deleteStudent = (query) =>
  new Promise((resolve, reject) => {
    try {
      validateDeleteQuery(query);
      const student = query.studentId;
      batchModel
        .deleteStudent({ _id: query.batchId }, { studentId: student })
        .then((deleteResult) => {
          logger.info(`deleteStudent - student deleted successfully`);
          resolve({
            status: statusCode.Success,
            message: "Successfully deleted student",
          });
        })
        .catch((batchError) => {
          logger.error(
            `deleteStudent - error:${JSON.stringify(batchError, null, 2)}`
          );
          reject(internalError);
        });
    } catch (e) {
      logger.error(`deleteStudent - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const deleteBatch = (query) =>
  new Promise((resolve, reject) => {
    try {
      validateQuery(query);
      batchModel
        .findOne({ _id: query.batchId })
        .then((batch) => {
          if (!batch) {
            reject({
              status: statusCode.InvalidData,
              message: "batch doesnot exist",
            });
          } else {
            batchModel
              .deleteOne({ _id: query.batchId })
              .then((deleteBatchResult) => {
                logger.info(`deleteBatch - batch deleted successfully`);
                testModel.deleteMany({ batchId: query.batchId })
                  .then((deletetestResult) => {
                    logger.info(`deleteBatch - tests for batch deleted successfully`);
                    resolve({
                      status: statusCode.Success,
                      message: "Successfully deleted batch",
                    });
                  });
              });
          }
        })
        .catch((err) => {
          logger.error(`deleteBatch - error deleting the batch ${err}`);
          reject(internalError);
        });
    } catch (e) {
      logger.error(`deleteBatch - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

const formatTestList = (tests) => {
  const testList = [];
  tests.forEach((test) => {
    test.batch = {
      _id: test.batchId._id,
      name: test.batchId.name
    };
    test.course = {
      _id: test.courseId._id,
      name: test.courseId.name
    };
    test.test = {
      _id: test.testId._id,
      testTitle: test.testId.testTitle
    };
    delete test.batchId;
    delete test.courseId;
    delete test.testId;
    testList.push(test);
  });
  return testList;
}

const getTestsForBatch = (query) => new Promise((resolve, reject) => {
  try {
    validateQuery(query);
    testModel.find({ batchId: query.batchId })
      .then((tests) => {
        if (!tests) {
          reject({
            status: statusCode.InvalidData,
            message: "tests not found"
          })
        }
        else {
          const allTests = formatTestList(tests);
          const response = {
            status: statusCode.Success,
            message: 'tests fetch success!',
            data: allTests,
          }
          resolve(response);
        }
      })
      .catch(err => {
        logger.error(`getTestsForBatch - error getting the batch ${err}`);
        reject(internalError)
      })
  }
  catch (e) {
    logger.error(`getTestsForBatch - error ${e}`)
    reject({
      status: statusCode.InvalidData,
      message: e.message
    })
  }
});

const getTeacherCoursesFromBatches = (req) => new Promise((resolve, reject) => {
  const teacherId = req.user.userMetaData.Teacher._id;
  batchModel.findTeacherCourse({ "teachers.teacherId": teacherId })
    .then((result) => {
      if (!result.length) {
        reject({
          status: statusCode.InvalidData,
          message: "course not found"
        })
      }
      else {
        const response = {
          status: statusCode.Success,
          message: 'tests fetch success!',
          data: result,
        }
        resolve(response);
      }
    })
    .catch(err => {
      logger.error(`getTeacherCoursesFromBatches - error getting the course ${err}`);
      reject(internalError)
    })
})


module.exports = {
  createBatch,
  addStudent,
  deleteStudent,
  editBatch,
  getAllBatches,
  getBatch,
  deleteBatch,
  getTestsForBatch,
  getTeacherCoursesFromBatches

}
