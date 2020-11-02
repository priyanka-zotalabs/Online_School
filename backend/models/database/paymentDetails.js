const seneca = require("seneca");
const config = require("../../config/index");

const databaseSenecaClient = seneca({
  timeout: config.databaseMicroService.timeout,
}).client(config.databaseMicroService);

const addMultiple = (paymentDetailss) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "PaymentDetail",
        cmd: "addMultiple",
        paymentDetailss,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

const find = (paymentDetailsQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "PaymentDetail",
        cmd: "find",
        paymentDetailsQueries,
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

module.exports = {
  addMultiple,
  find,
};
