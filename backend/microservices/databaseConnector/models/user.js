require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  instituteId:{ type: Schema.Types.ObjectId, ref: 'institutes', required: true },
  email: { type: String, lowercase: true },
  contactNumber: { type: String },
  password: { type: String },
  roleId: [{ type: Schema.Types.ObjectId, ref: 'roles', required: true }],
  publicKey: { type: String, lowercase: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const User = mongoose.model('users', userSchema);


const addMultiple = (args, callback) => {
  User.insertMany(args.userDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  User.find(args.userQueries)
    .populate('instituteId')
    .populate('roleId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  User.findOne(args.userQueries)
    .populate('instituteId')
    .populate('roleId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  User.update(args.userQueries, { $set: args.userDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const addToken = (args, callback) => {
  User.update(args.userQueries,
      {
          $push: { firebaseTokenId : args.userDetails.firebaseTokenId }
      })
      .then((res) => {
          callback(null, res)
      })
      .catch((err) => {
          new Error(JSON.stringify(err))
      });
};

const deleteToken = (args, callback) => {
  User.update({},
      {
          $pull: { firebaseTokenId : {$in : args.userDetails}}
      },{multi:true})
      .then((res) => {
          callback(null, res)
      })
      .catch((err) => {
          new Error(JSON.stringify(err))
      });
};

const deleteLogoutToken = (args, callback) => {
  User.update(args.userQueries,
      {
          $pull: { firebaseTokenId : args.userDetails}
      })
      .then((res) => {
          callback(null, res)
      })
      .catch((err) => {
          new Error(JSON.stringify(err))
      });
};

const arrayUpdate = (args, callback) => {
  User.update(args.userQueries, { $push: args.userDetails })
      .then((res) => callback(null, res))
      .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
  update,
  addToken,
  deleteToken,
  deleteLogoutToken,
  arrayUpdate
};
