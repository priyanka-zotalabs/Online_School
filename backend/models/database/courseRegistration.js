const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (courseRegistrationDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseRegistration',
    cmd: 'addMultiple',
    courseRegistrationDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (courseRegistrationQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseRegistration',
    cmd: 'findOne',
    courseRegistrationQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (courseRegistrationQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseRegistration',
    cmd: 'find',
    courseRegistrationQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (courseRegistrationQueries,courseRegistrationDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseRegistration',
    cmd: 'update',
    courseRegistrationQueries,
    courseRegistrationDetails,
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
  update
};
