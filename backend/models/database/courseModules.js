const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const addMultiple = (courseModulesDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseModules',
    cmd: 'addMultiple',
    courseModulesDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (courseModulesQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseModules',
    cmd: 'findOne',
    courseModulesQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const find = (courseModulesQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseModules',
    cmd: 'find',
    courseModulesQueries,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (courseModulesQueries, courseModulesDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseModules',
    cmd: 'update',
    courseModulesQueries,
    courseModulesDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const arrayUpdate = (courseModulesQueries, courseModulesDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "courseModules",
        cmd: "arrayUpdate",
        courseModulesQueries,
        courseModulesDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const arrayDelete = (courseModulesQueries, courseModulesDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "courseModules",
        cmd: "arrayDelete",
        courseModulesQueries,
        courseModulesDetails,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const addSchedule = (courseModulesQueries, courseModulesDetails, indexes) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'courseModules',
    cmd: 'addSchedule',
    courseModulesQueries,
    courseModulesDetails,
    indexes,
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
  addSchedule,
  arrayDelete,
  arrayUpdate
};
