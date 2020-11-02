/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
require("../lib/dbHelper");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatboxSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    messages: [
      {
        message: { type: String, require: true },
        name: { type: String, require: true },
        isMessageFromTutor: { type: Boolean, require: true },
        type: { type: String, require: true, default: "PERSONAL" },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Chatbox = mongoose.model("chatboxes", chatboxSchema);

const addMultiple = (args, callback) => {
  Chatbox.insertMany(args.chatboxDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  Chatbox.find(args.chatboxQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  Chatbox.findOne(args.chatboxQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  Chatbox.update(
    args.chatboxQueries,
    { $set: args.chatboxDetails },
    { upsert: true }
  )
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const updateMessage = (args, callback) => {
  Chatbox.update(args.chatboxQueries, {
    $push: { messages: args.chatboxDetails },
  })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update,
  updateMessage,
};
