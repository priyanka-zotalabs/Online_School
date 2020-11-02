require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const examSchema = new Schema({
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

const Exam = mongoose.model('exams', examSchema);

const addMultiple = (args, callback) => {
  Exam.insertMany(args.examDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  Exam.find(args.examQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  Exam.findOne(args.examQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
};
