const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (roleDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'role',
    cmd: 'addMultiple',
    roleDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (roleQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'role',
    cmd: 'findOne',
    roleQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (roleQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'role',
    cmd: 'find',
    roleQueries,
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
};
