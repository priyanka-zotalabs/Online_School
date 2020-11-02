const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (userQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'find',
    userQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (userQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'findOne',
    userQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (userDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'addMultiple',
    userDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (userQueries,userDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'update',
    userQueries,
    userDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addToken = (userQueries, userDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'addToken',
    userQueries,
    userDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const deleteToken = ( userDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'deleteToken',
    userDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const deleteLogoutToken = (userQueries, userDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'user',
    cmd: 'deleteLogoutToken',
    userQueries,
    userDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const arrayUpdate = (userQueries, userDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "user",
        cmd: "arrayUpdate",
        userQueries,
        userDetails,
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

module.exports = {
  find,
  findOne,
  addMultiple,
  update,
  addToken,
  deleteToken,
  deleteLogoutToken,
  arrayUpdate,
};
