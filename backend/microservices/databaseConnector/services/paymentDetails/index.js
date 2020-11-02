const paymentDetailsModel = require('../../models/paymentDetails');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'PaymentDetail', cmd: 'addMultiple' }, paymentDetailsModel.addMultiple);
  seneca.add({ role: 'PaymentDetail', cmd: 'find' }, paymentDetailsModel.find);
  };
