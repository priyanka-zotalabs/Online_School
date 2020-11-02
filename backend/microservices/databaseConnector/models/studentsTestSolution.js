require("../lib/dbHelper");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const studentsTestSolutionSchema = new Schema(
  {
    testId: { type: Schema.Types.ObjectId, ref: "tests", required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "batches", required: true },
    studentUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    score: { type: Number, required: true },
    totalMarks: { type: String, required: true },
    questions: [
      {
        qId: {
          type: Schema.Types.ObjectId,
          ref: "testQuestions",
          required: true,
        },
        question: { type: String },
        timeConsumed: { type: String },
        markedAnswer: { type: String },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const StudentsTestSolutions = mongoose.model(
  "studentsTestSolutions",
  studentsTestSolutionSchema
);

const addMultiple = (args, callback) => {
  StudentsTestSolutions.insertMany(args.studentsSolutionTestDetails, {
    ordered: false,
  })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
  StudentsTestSolutions.find(args.studentsSolutionTestQueries)
    .populate("studentId")
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const findOne = (args, callback) => {
  StudentsTestSolutions.findOne(args.studentsSolutionTestQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
};
