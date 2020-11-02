const feeStructureModel = require('../../models/feeStructure');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'feeStructure', cmd: 'addMultiple' }, feeStructureModel.addMultiple);
  seneca.add({ role: 'feeStructure', cmd: 'find' }, feeStructureModel.find);
  seneca.add({ role: 'feeStructure', cmd: 'findOne' }, feeStructureModel.findOne);
  seneca.add({ role: 'feeStructure', cmd: 'update' }, feeStructureModel.update);
  seneca.add({ role: 'feeStructure', cmd: 'deleteOne' }, feeStructureModel.deleteOne);
  };
