require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({

  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
  name: { type: String },
  imageUrl: { type: String },
  // teacherInterview: { type: Schema.Types.ObjectId, ref: 'teacherInterviews' },
  contactNumber: { type: String },
  // email:{ type: String },
  aboutMe: { type: String },
  subject: { type: String },
  board: { type: String },
  qualification: { type: String },
  experience: { type: String },
  location: { type: String },
  linkedInUrl: { type: String },
  resumeUrl: { type: String },
  isFirstLogin: { type: Boolean, default: true },
  status: { type: String, default: "PENDING" }
  //   resume:{
  //     description: { type: String },
  //     url: { type: String }
  // }
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

const Teacher = mongoose.model('teachers', teacherSchema);

const addMultiple = (args, callback) => {
  Teacher.insertMany(args.teacherDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  Teacher.find(args.teacherQueries)
    // .populate('userId', { path: 'roleId' })
    .populate({
      path: 'userId',
      model: 'users',
      populate: {
        path: 'roleId',
        model: 'roles'
      }
    })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  Teacher.findOne(args.teacherQueries)
    .populate('userId', { path: 'roleId' })
    .populate({
      path: 'userId',
      model: 'users',
      populate: {
        path: 'roleId',
        model: 'roles'
      }
    })
    // .populate('teacherInterview')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  Teacher.update(args.teacherQueries, { $set: args.teacherDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
  update,
};
