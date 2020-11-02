require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const liveClassSchema = new Schema({
  teacherUserId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'teachers', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
  name: { type: String, required: true },
  meetingID: { type: String, required: true },
  attendeePW: { type: String, required: true },
  moderatorPW: { type: String, required: true },
  welcome: { type: String, default: "Welcome to Amity live learning classes" },
  maxParticipants: { type: String },
  moderatorOnlyMessage: { type: String },
  dateTime: { type: Date },
  recordingUrl: { type: String },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const LiveClass = mongoose.model('liveClasses', liveClassSchema);

const addMultiple = (args, callback) => {
  LiveClass.insertMany(args.liveClassDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  LiveClass.find(args.liveClassQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  LiveClass.findOne(args.liveClassQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  LiveClass.update(args.liveClassQueries, { $set: args.liveClassDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update,
};
