require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherInterviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  teacherQualification: { type: String, required: true },
  teachingExperience: { type: String, required: true },
  resume: {
    basePath: { type: String },
    fileName: { type: String },
    url: { type: String },
  },
  linkedInUrl: { type: String },
  primarySubject: { type: String, required: true },
  secondarySubject: { type: String },
  grade: { type: String, required: true },
  board: { type: String, required: true },
  exams: { type: String },
  availableTime: {
    weekday: {
      preferTime: { type: String },
      availableHours: { type: String },
    },
    weekend: {
      preferTime: { type: String },
      availableHours: { type: String },
    },
  },
  currentOccupation: { type: String, required: true },
  internet: {
    speed: { type: String, required: true },
    basePath: { type: String, required: true },
    fileName: { type: String, required: true },
    url: { type: String, required: true },
  },
  address: { type: String, required: true },
  reference: { type: String },
  status: { type: String, enum: ['PENDING', "APPROVED", "REJECTED"], default: "PENDING" },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const TeacherInterview = mongoose.model('teacherInterviews', teacherInterviewSchema);

const addMultiple = (args, callback) => {
  TeacherInterview.insertMany(args.teacherInterviewDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  TeacherInterview.find(args.teacherInterviewQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  TeacherInterview.findOne(args.teacherInterviewQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const updateMany = (args, callback) => {
  TeacherInterview.updateMany(args.teacherInterviewQueries, { $set: args.TeacherInterviewDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
  updateMany
};
