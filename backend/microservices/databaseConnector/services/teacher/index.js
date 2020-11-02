const teacherModel = require('../../models/teacher');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'teacher', cmd: 'addMultiple' }, teacherModel.addMultiple);
  seneca.add({ role: 'teacher', cmd: 'find' }, teacherModel.find);
  seneca.add({ role: 'teacher', cmd: 'findOne' }, teacherModel.findOne);
  seneca.add({ role: 'teacher', cmd: 'update' }, teacherModel.update);
};
