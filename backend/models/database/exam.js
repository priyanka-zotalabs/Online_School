const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (examDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'exam',
    cmd: 'addMultiple',
    examDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (examQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'exam',
    cmd: 'findOne',
    examQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (examQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'exam',
    cmd: 'find',
    examQueries,
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
