const testQuestionModel = require('../../models/testQuestion');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'testQuestion', cmd: 'addMultiple' }, testQuestionModel.addMultiple);
  seneca.add({ role: 'testQuestion', cmd: 'find' }, testQuestionModel.find);
  seneca.add({ role: 'testQuestion', cmd: 'findOne' }, testQuestionModel.findOne);
  seneca.add({ role: 'testQuestion', cmd: 'update' }, testQuestionModel.update);
  seneca.add({ role: 'testQuestion', cmd: 'deleteOne' }, testQuestionModel.deleteOne);
  seneca.add({ role: 'testQuestion', cmd: 'updateQuestion' }, testQuestionModel.updateQuestion);
  seneca.add({ role: 'testQuestion', cmd: 'deleteQuestion' }, testQuestionModel.deleteQuestion);
  seneca.add({ role: 'testQuestion', cmd: 'findInstituteTest' }, testQuestionModel.findInstituteTest);
  };
