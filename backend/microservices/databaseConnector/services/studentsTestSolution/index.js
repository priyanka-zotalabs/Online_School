const studentsTestSolutionModel = require('../../models/studentsTestSolution');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'studentsTestSolution', cmd: 'addMultiple' }, studentsTestSolutionModel.addMultiple);
  seneca.add({ role: 'studentsTestSolution', cmd: 'find' }, studentsTestSolutionModel.find);
  seneca.add({ role: 'studentsTestSolution', cmd: 'findOne' }, studentsTestSolutionModel.findOne)
  };
