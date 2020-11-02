const testModel = require('../../models/test');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'test', cmd: 'addMultiple' }, testModel.addMultiple);
  seneca.add({ role: 'test', cmd: 'find' }, testModel.find);
  seneca.add({ role: 'test', cmd: 'findOne' }, testModel.findOne);
  seneca.add({ role: 'test', cmd: 'update' }, testModel.update);
  seneca.add({ role: 'test', cmd: 'deleteMany' }, testModel.deleteMany);
  seneca.add({ role: 'test', cmd: 'findTest' }, testModel.findTest);
}