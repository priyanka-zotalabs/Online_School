const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (zoomTokenQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'zoomToken',
    cmd: 'find',
    zoomTokenQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});



const findOne = (zoomTokenQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'zoomToken',
    cmd: 'findOne',
    zoomTokenQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (zoomTokenDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'zoomToken',
    cmd: 'addMultiple',
    zoomTokenDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const update = (zoomTokenQueries, zoomTokenDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'zoomToken',
    cmd: 'update',
    zoomTokenQueries,
    zoomTokenDetails,
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
  update
};
