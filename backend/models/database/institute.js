const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (instituteQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'Institute',
    cmd: 'find',
    instituteQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const getAllinstituteOnSearchFilter = (filter, excludeUserId) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'Institute',
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



const findOne = (instituteQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'Institute',
    cmd: 'findOne',
    instituteQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (instituteDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'Institute',
    cmd: 'addMultiple',
    instituteDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (instituteQueries, instituteDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'Institute',
    cmd: 'update',
    instituteQueries,
    instituteDetails,
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
  getAllinstituteOnSearchFilter,
  update,
};
