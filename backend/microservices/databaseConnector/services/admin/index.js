const adminModel = require('../../models/admin');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'admin', cmd: 'addMultiple' }, adminModel.addMultiple);
  seneca.add({ role: 'admin', cmd: 'find' }, adminModel.find);
  seneca.add({ role: 'admin', cmd: 'findOne' }, adminModel.findOne);
  };
