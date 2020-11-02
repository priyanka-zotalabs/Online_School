const seneca = require('seneca');
const config = require('../../config/index');

const databaseSenecaClient = seneca({ timeout: config.databaseMicroService.timeout })
  .client(config.databaseMicroService);

const find = (studentQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'student',
    cmd: 'find',
    studentQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});



const findOne = (studentQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'student',
    cmd: 'findOne',
    studentQueries
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addMultiple = (studentDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'student',
    cmd: 'addMultiple',
    studentDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});


const update = (studentQueries, studentDetails) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'student',
    cmd: 'update',
    studentQueries,
    studentDetails,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addStudentCourses = (studentQueries, courseDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "batch",
        cmd: "addStudentCourses",
        studentQueries,
        courseDetails,
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

const studentDetails = (studentQueries) => new Promise((resolve, reject) => {
  databaseSenecaClient.act({
    role: 'student',
    cmd: 'studentDetails',
    studentQueries
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
  update,
  addStudentCourses,
  studentDetails
};
