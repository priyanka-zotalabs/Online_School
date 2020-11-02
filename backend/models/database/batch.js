const seneca = require("seneca");
const config = require("../../config/index");

const databaseSenecaClient = seneca({
  timeout: config.databaseMicroService.timeout,
}).client(config.databaseMicroService);

const find = (batchQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "find",
        batchQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const findOne = (batchQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "findOne",
        batchQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const addMultiple = (batchDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "addMultiple",
        batchDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const update = (batchQueries, batchDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "update",
        batchQueries,
        batchDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const addStudent = (batchQueries, batchDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "addStudent",
        batchQueries,
        batchDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const deleteStudent = (batchQueries, batchDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "deleteStudent",
        batchQueries,
        batchDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const deleteOne = (batchQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "deleteOne",
        batchQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const findTeacherBatch = (batchQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "findTeacherBatch",
        batchQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const addBatchFeeStructure = (
  batchFeeStructureQueries,
  batchFeeStructureDetails
) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "addBatchFeeStructure",
        batchFeeStructureQueries,
        batchFeeStructureDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const updateBatchFeeStructure = (
  batchFeeStructureQueries,
  batchFeeStructureDetails
) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "updateBatchFeeStructure",
        batchFeeStructureQueries,
        batchFeeStructureDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const deleteBatchFeeStructure = (
  batchFeeStructureQueries,
  batchFeeStructureDetails
) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "deleteBatchFeeStructure",
        batchFeeStructureQueries,
        batchFeeStructureDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const updateStudentFeeStructureInBatch = (
  batchFeeStructureQueries,
  batchFeeStructureDetails,
  batchFeeStructureFilter
) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "updateStudentFeeStructureInBatch",
        batchFeeStructureQueries,
        batchFeeStructureDetails,
        batchFeeStructureFilter,
      },

      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const pushStudent = (batchQueries, batchDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "courseModules",
        cmd: "arrayUpdate",
        batchQueries,
        batchDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const getStudentFeeStructureFromBatch = (batchQueries1, batchQueries2) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "getStudentFeeStructureFromBatch",
        batchQueries1,
        batchQueries2,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const batchIsFirstInstallmentPaidStudent = (batchQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "batchIsFirstInstallmentPaidStudent",
        batchQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const findTeacherCourse = (batchQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "findTeacherCourse",
        batchQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
  
module.exports = {
  find,
  findOne,
  addMultiple,
  update,
  addStudent,
  deleteStudent,
  deleteOne,
  findTeacherBatch,
  addBatchFeeStructure,
  updateBatchFeeStructure,
  deleteBatchFeeStructure,
  updateStudentFeeStructureInBatch,
  pushStudent,
  getStudentFeeStructureFromBatch,
  batchIsFirstInstallmentPaidStudent,
  findTeacherCourse
};
