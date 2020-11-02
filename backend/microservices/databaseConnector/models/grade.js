require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradeSchema = new Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Grade = mongoose.model('grades', gradeSchema);

const addMultiple = (args, callback) => {
  Grade.insertMany(args.gradeDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  Grade.find(args.gradeQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  Grade.findOne(args.gradeQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
};
