const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (liveClassDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'liveClass',
    cmd: 'addMultiple',
    liveClassDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (liveClassQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'liveClass',
    cmd: 'findOne',
    liveClassQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (liveClassQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'liveClass',
    cmd: 'find',
    liveClassQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const update = (liveClassQueries, liveClassDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'liveClass',
    cmd: 'update',
    liveClassQueries,
    liveClassDetails,
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
