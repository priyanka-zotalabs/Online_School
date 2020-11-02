const seneca = require("seneca");
const config = require("../../config/index");

const databaseSenecaClient = seneca({
  timeout: config.databaseMicroService.timeout,
}).client(config.databaseMicroService);

const find = (studentsSolutionTestQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "studentsTestSolution",
        cmd: "find",
        studentsSolutionTestQueries,
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

const findOne = (studentsSolutionTestQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "studentsTestSolution",
        cmd: "findOne",
        studentsSolutionTestQueries,
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

const addMultiple = (studentsSolutionTestDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "studentsTestSolution",
        cmd: "addMultiple",
        studentsSolutionTestDetails,
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
};
