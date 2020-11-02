const courseModulesModel = require('../../models/courseModules');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'courseModules', cmd: 'addMultiple' }, courseModulesModel.addMultiple);
  seneca.add({ role: 'courseModules', cmd: 'find' }, courseModulesModel.find);
  seneca.add({ role: 'courseModules', cmd: 'findOne' }, courseModulesModel.findOne);
  seneca.add({ role: 'courseModules', cmd: 'update' }, courseModulesModel.update);
  seneca.add({ role: 'courseModules', cmd: 'arrayUpdate' }, courseModulesModel.arrayUpdate);
  seneca.add({ role: 'courseModules', cmd: 'arrayDelete' }, courseModulesModel.arrayDelete);
  seneca.add({ role: 'courseModules', cmd: 'addSchedule' }, courseModulesModel.addSchedule);
};

