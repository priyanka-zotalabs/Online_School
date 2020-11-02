const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (testQuestionQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'find',
    testQuestionQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findOne = (testQuestionQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'findOne',
    testQuestionQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (testQuestionDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'addMultiple',
    testQuestionDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const update = (testQuestionQueries,testQuestionDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'update',
    testQuestionQueries,
    testQuestionDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const deleteOne = (testQuestionQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'deleteOne',
    testQuestionQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const updateQuestion = (testQuestionQueries,testQuestionDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'updateQuestion',
    testQuestionQueries,
    testQuestionDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const deleteQuestion = (testQuestionQueries,testQuestionDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'deleteQuestion',
    testQuestionQueries,
    testQuestionDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const findInstituteTest = (testQuestionQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'testQuestion',
    cmd: 'findInstituteTest',
    testQuestionQueries
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
  addMultiple,
  update,
  deleteOne,
  updateQuestion,
  deleteQuestion,
  findInstituteTest
};
