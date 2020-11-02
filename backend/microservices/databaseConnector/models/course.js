require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  teacherUserId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'teachers', required: true },
  name: { type: String, required: true },
  gradeId: { type: Schema.Types.ObjectId, ref: 'grades'},
  boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
  examId: { type: Schema.Types.ObjectId, ref: 'exams' },
  subjectName: { type: String, required: true },
  introduction: { type: String, required: true },
  dateTime: { type: Date },
  courseImage: {
    basePath: { type: String },
    fileName: { type: String },
    url: { type: String },
  },
  rejectReason: { type: String },
  status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Course = mongoose.model('courses', courseSchema);

const addMultiple = (args, callback) => {
  Course.insertMany(args.courseDetails, { ordered: false })
    .then((res) => {
      callback(null, res)
    }
    )
    .catch((err) => {
      new Error(JSON.stringify(err))
    }
    );
};
const find = (args, callback) => {
  Course.find(args.courseQueries).sort({dateTime: 1})
    .populate('teacherUserId')
    .populate('teacherId')
    .populate('gradeId')
    .populate('boardId')
    .populate('examId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  Course.findOne(args.courseQueries)
    .populate('teacherUserId')
    .populate('teacherId')
    .populate('gradeId')
    .populate('boardId')
    .populate('examId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  Course.update(args.courseQueries, { $set: args.courseDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update
};
