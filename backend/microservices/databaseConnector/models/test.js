require("../lib/dbHelper");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const testSchema = new Schema(
  {
    testId: { type: Schema.Types.ObjectId, ref: "testQuestions", required: true, },
    courseId: { type: Schema.Types.ObjectId, ref: "courseModules", required: true, },
    instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
    moduleId: { type: String, },
    chapterId: { type: String, },
    batchId: { type: Schema.Types.ObjectId, ref: "batches", required: true, },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, },
    startTime: { type: String },

  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const test = mongoose.model(
  "tests",
  testSchema
);

const addMultiple = (args, callback) => {
  test.insertMany(args.testDetails, { ordered: false })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  test.find(args.testQueries)
    .populate('courseId')
    .populate('batchId')
    .populate('testId')
    .then((res) => { callback(null, res)})
    .catch((err) => { new Error(JSON.stringify(err))});
};

const findOne = (args, callback) => {
  test.findOne(args.testQueries)
    .populate('courseId')
    .populate('batchId')
    .populate('testId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  test.update(
    args.testQueries,
    { $set: args.testDetails },
    { upsert: true }
  )
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const deleteMany = (args, callback) => {
  test.deleteMany(args.testQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findTest = (args, callback) => {
  test.find({ batchId: { $in: args.testQueries } })
    .populate("courseId", 'name')
    .populate("batchId",'name' )
    .populate("testId",'name')
    .then((res) => callback(null, res))
    .catch((err) =>{
       new Error(JSON.stringify(err))
    });
};


module.exports = {
  addMultiple,
  find,
  findOne,
  update,
  deleteMany,
  findTest

};
