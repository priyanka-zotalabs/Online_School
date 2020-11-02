const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (scheduleDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'schedule',
    cmd: 'addMultiple',
    scheduleDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const findOne = (scheduleQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'schedule',
    cmd: 'findOne',
    scheduleQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (scheduleQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'schedule',
    cmd: 'find',
    scheduleQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (scheduleQueries, scheduleDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'schedule',
    cmd: 'update',
    scheduleQueries,
    scheduleDetails,
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
  update,
};
