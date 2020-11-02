const discussionForumModel = require("../../models/discussionForum");

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: "discussionForum", cmd: "addMultiple" }, discussionForumModel.addMultiple);
  seneca.add({ role: "discussionForum", cmd: "find" }, discussionForumModel.find);
  seneca.add({ role: "discussionForum", cmd: "findOne" }, discussionForumModel.findOne);
  seneca.add({ role: "discussionForum", cmd: "update" }, discussionForumModel.update);
  seneca.add({ role: "discussionForum", cmd: "updateMessage" }, discussionForumModel.updateMessage);
};
