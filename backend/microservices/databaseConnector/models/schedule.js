require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  sourceType: { type: String, required: true },
  teacherUserId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'teachers', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'courseModules', required: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'batches', required: true },
  instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
  // moduleId: { type: Schema.Types.ObjectId, ref: 'courseModules', required: true },
  // chapterId: { type: Schema.Types.ObjectId, ref: 'courseModules', required: true },
  moduleId: { type: String, required: true },
  chapterId: { type: String, required: true },
  name: { type: String, required: true },
  channelName: { type: String },
  meetingID: { type: String },
  attendeePW: { type: String },
  moderatorPW: { type: String },
  welcome: { type: String, default: "Welcome to live learning classes" },
  maxParticipants: { type: String },
  moderatorOnlyMessage: { type: String },
  dateTime: { type: Date },
  recordingUrl: { type: String },
  // dateTime: { type: Date },
  // meetingId: { type: String },
  url: { type: String },
  // recordingUrl: { type: String },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const schedule = mongoose.model('schedules', scheduleSchema);

const addMultiple = (args, callback) => {
  schedule.insertMany(args.scheduleDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  schedule.find(args.scheduleQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  schedule.findOne(args.scheduleQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  schedule.update(args.scheduleQueries, { $set: args.scheduleDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update,
};
