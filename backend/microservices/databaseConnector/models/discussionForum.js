require("../lib/dbHelper");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const discussionForumSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "courseModules",
      required: true,
    },
    batchId: { type: Schema.Types.ObjectId, ref: "batches", required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    messages: [
      {
        message: { type: String, require: true },
        senderDetails: {
          senderId: { type: Schema.Types.ObjectId, ref: "users", required: true },
          name: { type: String, require: true },
          imageUrl: { type: String },
        },
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

const DiscissionForum = mongoose.model(
  "discussionForums",
  discussionForumSchema
);

const addMultiple = (args, callback) => {
  DiscissionForum.insertMany(args.discussionForumDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  DiscissionForum.find(args.discussionForumQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  DiscissionForum.findOne(args.discussionForumQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  DiscissionForum.update(
    args.discussionForumQueries,
    { $set: args.discussionForumDetails },
    { upsert: true }
  )
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const updateMessage = (args, callback) => {
  DiscissionForum.updateOne(args.discussionForumQueries, {
    $push: { "messages": [args.discussionForumDetails] },
  },
    { upsert: true }
  )
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
