const seneca = require("seneca");
const config = require("../../config/index");

const databaseSenecaClient = seneca({
  timeout: config.databaseMicroService.timeout,
}).client(config.databaseMicroService);

const addMultiple = (chatboxDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "chatbox",
        cmd: "addMultiple",
        chatboxDetails,
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

const findOne = (chatboxQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "chatbox",
        cmd: "findOne",
        chatboxQueries,
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

const find = (chatboxQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "chatbox",
        cmd: "find",
        chatboxQueries,
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

const update = (chatboxQueries, chatboxDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "chatbox",
        cmd: "update",
        chatboxQueries,
        chatboxDetails,
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

const updateMessage = (chatboxQueries, chatboxDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "chatbox",
        cmd: "updateMessage",
        chatboxQueries,
        chatboxDetails,
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
  findOne,
  update,
  updateMessage,
};
