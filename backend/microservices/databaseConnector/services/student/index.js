const studentModel = require('../../models/student');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'student', cmd: 'addMultiple' }, studentModel.addMultiple);
  seneca.add({ role: 'student', cmd: 'find' }, studentModel.find);
  seneca.add({ role: 'student', cmd: 'findOne' }, studentModel.findOne);
  seneca.add({ role: 'student', cmd: 'update' }, studentModel.update);
  seneca.add({ role: 'student', cmd: 'addStudentCourses' }, studentModel.addStudentCourses);
  seneca.add({ role: 'student', cmd: 'studentDetails' }, studentModel.studentDetails);

};
