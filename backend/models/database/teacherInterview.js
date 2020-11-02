const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (teacherInterviewDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacherInterview',
    cmd: 'addMultiple',
    teacherInterviewDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const findOne = (teacherInterviewQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacherInterview',
    cmd: 'findOne',
    teacherInterviewQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (teacherInterviewQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacherInterview',
    cmd: 'find',
    teacherInterviewQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const updateMany = (teacherInterviewQueries, TeacherInterviewDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacherInterview',
    cmd: 'updateMany',
    teacherInterviewQueries,
    TeacherInterviewDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

module.exports = {
  addMultiple,
  find,
  findOne,
  updateMany
};
