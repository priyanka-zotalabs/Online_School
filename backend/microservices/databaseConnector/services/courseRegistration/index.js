const courseRegistrationModel = require('../../models/courseRegistration');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'courseRegistration', cmd: 'addMultiple' }, courseRegistrationModel.addMultiple);
  seneca.add({ role: 'courseRegistration', cmd: 'find' }, courseRegistrationModel.find);
  seneca.add({ role: 'courseRegistration', cmd: 'findOne' }, courseRegistrationModel.findOne);
  seneca.add({ role: 'courseRegistration', cmd: 'update' }, courseRegistrationModel.update);
  };
