const courseModel = require('../../models/course');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'course', cmd: 'addMultiple' }, courseModel.addMultiple);
  seneca.add({ role: 'course', cmd: 'find' }, courseModel.find);
  seneca.add({ role: 'course', cmd: 'findOne' }, courseModel.findOne);
  seneca.add({ role: 'course', cmd: 'update' }, courseModel.update);
  };
