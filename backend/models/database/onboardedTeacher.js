const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (onboardedTeacherQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'onboardedTeacher',
    cmd: 'find',
    onboardedTeacherQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});



const findOne = (onboardedTeacherQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'onboardedTeacher',
    cmd: 'findOne',
    onboardedTeacherQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (onboardedTeacherDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'onboardedTeacher',
    cmd: 'addMultiple',
    onboardedTeacherDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (onboardedTeacherQueries, onboardedTeacherDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'onboardedTeacher',
    cmd: 'update',
    onboardedTeacherQueries,
    onboardedTeacherDetails,
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
  update,
};
