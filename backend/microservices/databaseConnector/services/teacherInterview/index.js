const teacherInterviewModel = require('../../models/teacherInterview');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'teacherInterview', cmd: 'addMultiple' }, teacherInterviewModel.addMultiple);
  seneca.add({ role: 'teacherInterview', cmd: 'find' }, teacherInterviewModel.find);
  seneca.add({ role: 'teacherInterview', cmd: 'findOne' }, teacherInterviewModel.findOne);
  seneca.add({ role: 'teacherInterview', cmd: 'updateMany' }, teacherInterviewModel.updateMany);
};
