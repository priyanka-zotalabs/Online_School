const zoomTokenModel = require('../../models/zoomToken');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'zoomToken', cmd: 'addMultiple' }, zoomTokenModel.addMultiple);
  seneca.add({ role: 'zoomToken', cmd: 'find' }, zoomTokenModel.find);
  seneca.add({ role: 'zoomToken', cmd: 'findOne' }, zoomTokenModel.findOne);
  seneca.add({ role: 'zoomToken', cmd: 'update' }, zoomTokenModel.update);

};
