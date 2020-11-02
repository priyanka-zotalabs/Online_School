const instituteModel = require('../../models/institute');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'Institute', cmd: 'addMultiple' }, instituteModel.addMultiple);
  seneca.add({ role: 'Institute', cmd: 'find' }, instituteModel.find);
  seneca.add({ role: 'Institute', cmd: 'findOne' }, instituteModel.findOne);
  seneca.add({ role: 'Institute', cmd: 'update' }, instituteModel.update);
};
