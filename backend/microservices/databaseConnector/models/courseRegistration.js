require("../lib/dbHelper");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseRegistrationSchema = new Schema(
  {
    studentUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    studentId: { type: Schema.Types.ObjectId, ref: "students", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "courseModules", required: true },
    liveClassId: {
      type: Schema.Types.ObjectId,
      ref: "liveClasses"
    },
    amount: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    transaction_id: { type: String, required: true },
    name: { type: String, required: true },
    contactNumber: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const CourseRegistration = mongoose.model(
  "courseRegistrations",
  courseRegistrationSchema
);

const addMultiple = (args, callback) => {
  CourseRegistration.insertMany(args.courseRegistrationDetails, {
    ordered: false,
  })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const find = (args, callback) => {
  CourseRegistration.find(args.courseRegistrationQueries)
    .populate('studentId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  CourseRegistration.findOne(args.courseRegistrationQueries)
    .populate("courseId")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const update = (args, callback) => {
  CourseRegistration.update(
    args.courseRegistrationQueries,
    args.courseRegistrationDetails,
    { upsert: true }
  )
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update,
};
