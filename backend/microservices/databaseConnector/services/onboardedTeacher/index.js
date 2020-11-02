const onboardedTeacherModel = require('../../models/onboardedTeacher');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'onboardedTeacher', cmd: 'addMultiple' }, onboardedTeacherModel.addMultiple);
  seneca.add({ role: 'onboardedTeacher', cmd: 'find' }, onboardedTeacherModel.find);
  seneca.add({ role: 'onboardedTeacher', cmd: 'findOne' }, onboardedTeacherModel.findOne);
  seneca.add({ role: 'onboardedTeacher', cmd: 'update' }, onboardedTeacherModel.update);
};
