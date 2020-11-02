const liveClassModel = require('../../models/liveClass');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'liveClass', cmd: 'addMultiple' }, liveClassModel.addMultiple);
  seneca.add({ role: 'liveClass', cmd: 'find' }, liveClassModel.find);
  seneca.add({ role: 'liveClass', cmd: 'findOne' }, liveClassModel.findOne);
  seneca.add({ role: 'liveClass', cmd: 'update' }, liveClassModel.update);
  };
