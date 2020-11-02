require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const zoomTokenSchema = new Schema({
  access_token: { type: String },
  token_type: { type: String },
  refresh_token: { type: String },
  expires_in: { type: String },
  scope:{ type: String },
  key : { type: String }
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

const zoomToken = mongoose.model('zoomToken', zoomTokenSchema);

const addMultiple = (args, callback) => {
  zoomToken.insertMany(args.zoomTokenDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  zoomToken.find(args.zoomTokenQueries)

    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  zoomToken.findOne(args.zoomTokenQueries)

    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  zoomToken.update(args.zoomTokenQueries, { $set: args.zoomTokenDetails }, {upsert: true})
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
  update
};
