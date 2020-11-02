const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (teacherQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacher',
    cmd: 'find',
    teacherQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const getAllTeacherOnSearchFilter = (filter, excludeUserId) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacher',
    cmd: 'getBySearchFilter',
    filter,
    excludeUserId
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});



const findOne = (teacherQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacher',
    cmd: 'findOne',
    teacherQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (teacherDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacher',
    cmd: 'addMultiple',
    teacherDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (teacherQueries, teacherDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'teacher',
    cmd: 'update',
    teacherQueries,
    teacherDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


module.exports = {
  find,
  addMultiple,
  findOne,
  getAllTeacherOnSearchFilter,
  update,
};
