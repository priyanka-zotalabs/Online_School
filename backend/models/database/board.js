const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (boardDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'board',
    cmd: 'addMultiple',
    boardDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (boardQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'board',
    cmd: 'findOne',
    boardQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (boardQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'board',
    cmd: 'find',
    boardQueries,
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
