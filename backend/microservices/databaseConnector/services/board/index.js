const boardModel = require('../../models/board');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'board', cmd: 'addMultiple' }, boardModel.addMultiple);
  seneca.add({ role: 'board', cmd: 'find' }, boardModel.find);
  seneca.add({ role: 'board', cmd: 'findOne' }, boardModel.findOne);
  };
