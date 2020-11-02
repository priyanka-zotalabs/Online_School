const gradeModel = require('../../models/grade');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'grade', cmd: 'addMultiple' }, gradeModel.addMultiple);
  seneca.add({ role: 'grade', cmd: 'find' }, gradeModel.find);
  seneca.add({ role: 'grade', cmd: 'findOne' }, gradeModel.findOne);
  };
