const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (courseDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'course',
    cmd: 'addMultiple',
    courseDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (courseQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'course',
    cmd: 'findOne',
    courseQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (courseQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'course',
    cmd: 'find',
    courseQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (courseQueries,courseDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'course',
    cmd: 'update',
    courseQueries,
    courseDetails,
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
  update
};
