const seneca = require("seneca");
const config = require("../../config/index");

const databaseSenecaClient = seneca({
  timeout: config.databaseMicroService.timeout,
}).client(config.databaseMicroService);

const addMultiple = (discussionForumDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "discussionForum",
        cmd: "addMultiple",
        discussionForumDetails,
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

const findOne = (discussionForumQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "discussionForum",
        cmd: "findOne",
        discussionForumQueries,
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

const find = (discussionForumQueries) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "discussionForum",
        cmd: "find",
        discussionForumQueries,
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

const update = (discussionForumQueries, discussionForumDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "discussionForum",
        cmd: "update",
        discussionForumQueries,
        discussionForumDetails,
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

const updateMessage = (discussionForumQueries, discussionForumDetails) =>
  new Promise((resolve, reject) => {
    databaseSenecaClient.act(
      {
        role: "discussionForum",
        cmd: "updateMessage",
        discussionForumQueries  ,
        discussionForumDetails,
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
