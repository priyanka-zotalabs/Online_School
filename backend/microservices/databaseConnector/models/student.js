require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
  name: { type: String },
  imageUrl: { type: String },
  contactNumber: { type: String },
  class: { type: String },
  board: { type: String },
  school: { type: String },
  location: { type: String },
  courses: [{
    courseId:  { type: Schema.Types.ObjectId, ref: 'courseModules', required: true },
    // courseName:{ type: String },
    batchId: { type: Schema.Types.ObjectId, ref: 'batches', required: true },
    // batchName:{ type: String },
    // feeStructureId: { type: String },
    // feeStructureName:{ type: String },
  }],
  discount: { type: String },
  isFirstLogin: { type: Boolean, default: true },
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

const Student = mongoose.model('students', studentSchema);

const addMultiple = (args, callback) => {
  Student.insertMany(args.studentDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  Student.find(args.studentQueries)
    .populate('userId')
    .populate('courses.courseId',"name")
    .populate('courses.batchId',"name")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  Student.findOne(args.studentQueries)
    .populate('userId')
    .populate('courses.courseId',"name")
    .populate('courses.batchId',"name")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  Student.update(args.studentQueries, { $set: args.studentDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const addStudentCourses = (args, callback) => {
  Student.updateOne(args.studentQueries, {
    $push: { courses: args.courseDetails },
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const studentDetails = (args, callback) => {
  Student.findOne(args.studentQueries)
    .populate('courses.courseId')
    .populate('courses.batchId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update,
  addStudentCourses,
  studentDetails
};
