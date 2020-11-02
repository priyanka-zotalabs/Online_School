require("../lib/dbHelper");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseModulesSchema = new Schema(
  {
    teacherUserId: { type: Schema.Types.ObjectId, ref: "users" },
    teacherId: { type: Schema.Types.ObjectId, ref: "teachers" },
    instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String },
    format: { type: String },
    isActive: { type: String, default: true },
    courseImageUrl: { type: String },
    modules: [
      {
        uid: { type: String },
        name: { type: String },
        description: { type: String },
        teacherIds: [{ type: String }],
        classType: { type: String },
        totalClasses: { type: String },
        modulesImageUrl: { type: String },
        chapters: [
          {
            uid: { type: String },
            name: { type: String },
            description: { type: String },
            isLock: { type: Boolean, require: true },
            content: [
              {
                uid: { type: String },
                title: { type: String },
                typeOfContent: { type: String },
                description: { type: String },
                value: { type: String },
              },
            ],
          },
        ],
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

const courseModules = mongoose.model("courseModules", courseModulesSchema);

const addMultiple = (args, callback) => {
  courseModules
    .insertMany(args.courseModulesDetails, { ordered: false })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};
const find = (args, callback) => {
  courseModules
    .find(args.courseModulesQueries)
    .sort({ dateTime: 1 })
    //.populate('teacherUserId')
    .populate("teacherId")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
const findOne = (args, callback) => {
  courseModules
    .findOne(args.courseModulesQueries)
    .populate("teacherUserId")
    .populate("teacherId")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  courseModules
    .update(args.courseModulesQueries, { $set: args.courseModulesDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const arrayUpdate = (args, callback) => {
  courseModules
    .update(args.courseModulesQueries, { $push: args.courseModulesDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const arrayDelete = (args, callback) => {
  courseModules
    .update(args.courseModulesQueries, { $pull: args.courseModulesDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const addSchedule = (args, callback) => {
  const key = `modules.${args.indexes.moduleIndex}.chapters.${args.indexes.chapterIndex}.schedules`;
  courseModules
    .update(args.courseModulesQueries, {
      $push: { [key]: args.courseModulesDetails },
    })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

module.exports = {
  addMultiple,
  find,
  findOne,
  update,
  addSchedule,
  arrayUpdate,
  arrayDelete,
};
