const scheduleModel = require('../../models/schedule');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'schedule', cmd: 'addMultiple' }, scheduleModel.addMultiple);
  seneca.add({ role: 'schedule', cmd: 'find' }, scheduleModel.find);
  seneca.add({ role: 'schedule', cmd: 'findOne' }, scheduleModel.findOne);
  seneca.add({ role: 'schedule', cmd: 'update' }, scheduleModel.update);
  };
