const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (testQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'test',
    cmd: 'find',
    testQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (testQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'test',
    cmd: 'findOne',
    testQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (testDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'test',
    cmd: 'addMultiple',
    testDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (testQueries,testDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'test',
    cmd: 'update',
    testQueries,
    testDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const deleteMany = (testQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'test',
    cmd: 'deleteMany',
    testQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const findTest = (testQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'test',
    cmd: 'findTest',
    testQueries
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
  findOne,
  addMultiple,
  update,
  deleteMany,
  findTest
};
