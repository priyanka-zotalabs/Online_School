const chatboxModel = require("../../models/chatbox");

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: "chatbox", cmd: "addMultiple" }, chatboxModel.addMultiple);
  seneca.add({ role: "chatbox", cmd: "find" }, chatboxModel.find);
  seneca.add({ role: "chatbox", cmd: "findOne" }, chatboxModel.findOne);
  seneca.add({ role: "chatbox", cmd: "update" }, chatboxModel.update);
  seneca.add({ role: "chatbox", cmd: "updateMessage" }, chatboxModel.updateMessage);
};
