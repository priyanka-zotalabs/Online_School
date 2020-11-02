const userModel = require('../../models/user');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'user', cmd: 'addMultiple' }, userModel.addMultiple);
  seneca.add({ role: 'user', cmd: 'find' }, userModel.find);
  seneca.add({ role: 'user', cmd: 'findOne' }, userModel.findOne);
  seneca.add({ role: 'user', cmd: 'update' }, userModel.update);
  seneca.add({ role: 'user', cmd: 'addToken' }, userModel.addToken);
  seneca.add({ role: 'user', cmd: 'deleteToken' }, userModel.deleteToken);
  seneca.add({ role: 'user', cmd: 'deleteLogoutToken' }, userModel.deleteLogoutToken);
  seneca.add({ role: 'user', cmd: 'arrayUpdate' }, userModel.arrayUpdate);
  };
