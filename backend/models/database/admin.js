const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (adminQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'admin',
    cmd: 'find',
    adminQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (adminQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'admin',
    cmd: 'findOne',
    adminQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (adminDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'admin',
    cmd: 'addMultiple',
    adminDetails,
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
  addMultiple
};
