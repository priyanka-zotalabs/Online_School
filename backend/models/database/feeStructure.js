const seneca = require("seneca");
const config = require("../../config/index");

const databaseSenecaClient = seneca({
  timeout: config.databaseMicroService.timeout,
}).client(config.databaseMicroService);

const find = (feeStructureQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "feeStructure",
        cmd: "find",
        feeStructureQueries,
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

const findOne = (feeStructureQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "feeStructure",
        cmd: "findOne",
        feeStructureQueries,
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

const addMultiple = (feeStructureDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "feeStructure",
        cmd: "addMultiple",
        feeStructureDetails,
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

const update = (feeStructureQueries, feeStructureDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "feeStructure",
        cmd: "update",
        feeStructureQueries,
        feeStructureDetails,
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

const deleteOne = (feeStructureQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "feeStructure",
        cmd: "deleteOne",
        feeStructureQueries,
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
  deleteOne,
};
