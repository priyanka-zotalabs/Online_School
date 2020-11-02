const examModel = require('../../models/exam');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'exam', cmd: 'addMultiple' }, examModel.addMultiple);
  seneca.add({ role: 'exam', cmd: 'find' }, examModel.find);
  seneca.add({ role: 'exam', cmd: 'findOne' }, examModel.findOne);
  };
