const batchModel = require('../../models/batch');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'batch', cmd: 'addMultiple' }, batchModel.addMultiple);
  seneca.add({ role: 'batch', cmd: 'find' }, batchModel.find);
  seneca.add({ role: 'batch', cmd: 'findOne' }, batchModel.findOne);
  seneca.add({ role: 'batch', cmd: 'update' }, batchModel.update);
  seneca.add({ role: 'batch', cmd: 'addStudent' }, batchModel.addStudent);
  seneca.add({ role: 'batch', cmd: 'deleteStudent' }, batchModel.deleteStudent);
  seneca.add({ role: 'batch', cmd: 'deleteOne' }, batchModel.deleteOne);
  seneca.add({ role: 'batch', cmd: 'findTeacherBatch' }, batchModel.findTeacherBatch);
  seneca.add({ role: 'batch', cmd: 'addBatchFeeStructure' }, batchModel.addBatchFeeStructure);
  seneca.add({ role: 'batch', cmd: 'updateBatchFeeStructure' }, batchModel.updateBatchFeeStructure);
  seneca.add({ role: 'batch', cmd: 'deleteBatchFeeStructure' }, batchModel.deleteBatchFeeStructure);
  seneca.add({ role: 'batch', cmd: 'updateStudentFeeStructureInBatch' }, batchModel.updateStudentFeeStructureInBatch);
  seneca.add({ role: 'batch', cmd: 'pushStudent' }, batchModel.pushStudent);
  seneca.add({ role: 'batch', cmd: 'getStudentFeeStructureFromBatch' }, batchModel.getStudentFeeStructureFromBatch);
  seneca.add({ role: 'batch', cmd: 'batchIsFirstInstallmentPaidStudent' }, batchModel.batchIsFirstInstallmentPaidStudent);
  seneca.add({ role: 'batch', cmd: 'findTeacherCourse' }, batchModel.findTeacherCourse);
  };
 