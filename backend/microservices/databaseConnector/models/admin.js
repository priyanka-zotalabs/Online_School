require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
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
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  });

const Admin = mongoose.model('admins', adminSchema);

const addMultiple = (args, callback) => {
  Admin.insertMany(args.adminDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  Admin.find(args.adminQueries)
    .populate('userId')
    .populate('instituteId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  Admin.findOne(args.adminQueries)
    .populate('userId')
    .populate('instituteId').then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
};
