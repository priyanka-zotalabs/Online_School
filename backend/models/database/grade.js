const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (gradeDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'grade',
    cmd: 'addMultiple',
    gradeDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (gradeQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'grade',
    cmd: 'findOne',
    gradeQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (gradeQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'grade',
    cmd: 'find',
    gradeQueries,
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
