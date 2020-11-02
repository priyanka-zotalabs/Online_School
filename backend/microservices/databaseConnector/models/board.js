require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
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

const Board = mongoose.model('boards', boardSchema);

const addMultiple = (args, callback) => {
  Board.insertMany(args.boardDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  Board.find(args.boardQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  Board.findOne(args.boardQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
};
