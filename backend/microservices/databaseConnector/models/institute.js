require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const instituteSchema = new Schema({

  // userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  name: { type: String },
  email: { type: String },
  imageUrl: { type: String },
  contactNumber: { type: String },
  aboutMe: { type: String },
  subject: { type: String },
  board: { type: String },
  location: { type: String },
  website: { type: String },
  brochureUrl: { type: String },
  isFirstLogin: { type: Boolean, default: true }
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

const Institute = mongoose.model('institutes', instituteSchema);

const addMultiple = (args, callback) => {
  Institute.insertMany(args.instituteDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  Institute.find(args.instituteQueries)
    // .populate('userId')
    // .populate('instituteInterview')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  Institute.findOne(args.instituteQueries)
    // .populate('userId')
    // .populate('instituteInterview')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  Institute.update(args.instituteQueries, { $set: args.instituteDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
  update,
};
