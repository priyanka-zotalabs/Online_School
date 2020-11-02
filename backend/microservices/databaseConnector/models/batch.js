require("../lib/dbHelper");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const batchSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "courseModules", required: true },
    instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true },
    name: { type: String, required: true },
    teachers: [
      {
        teacherId: { type: Schema.Types.ObjectId, ref: "teachers" },
        _id: false,
      },
    ],
    students: [
      {
        studentId: { type: Schema.Types.ObjectId, ref: "students" },
       // name: { type: String, required: true },
        _id: false,
        // status: { type: String, default: "Pending" },
        // isFirstInstallmentPaid: { type: Boolean, default: false },
        // feeStructure: {
        //   name: { type: String },
        //   amount: { type: String },
        //   tax: { type: String },
        //   totalAmount: { type: String },
        //   currency: { type: String},
        //   numberOfInstallments: { type: String },
        //   durationBetweenInstallments: { type: String },
        //   installmentCalculator: [
        //     {
        //       date: { type: String },
        //       amount: { type: String },
        //       isPaid: { type: Boolean, default: false },
        //     },
        //   ],
        // },
      },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    duration: { type: Number },
    // feeStructure: [
    //   {
    //     name: { type: String },
    //     amount: { type: String },
    //     tax: { type: String },
    //     totalAmount: { type: String },
    //     currency: { type: String},
    //     numberOfInstallments: { type: String },
    //     durationBetweenInstallments: { type: String },
    //     installmentCalculator: [
    //       {
    //         date: { type: String },
    //         amount: { type: String },
    //       },
    //     ],
    //   },
    // ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Batch = mongoose.model("batches", batchSchema);

const addMultiple = (args, callback) => {
  Batch.insertMany(args.batchDetails, { ordered: false })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const find = (args, callback) => {
  Batch.find(args.batchQueries)
    .populate("courseId")
    .populate("teachers.teacherId", 'name')
    .populate("students.studentId",'name imageUrl userId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  Batch.findOne(args.batchQueries)
    .populate("courseId")
    .populate("teachers.teacherId", 'name')
    .populate("students.studentId",'name imageUrl userId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  Batch.update(args.batchQueries, { $set: args.batchDetails }, { upsert: true })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const addStudent = (args, callback) => {
  Batch.updateOne(args.batchQueries, {
    $push: { students: args.batchDetails },
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const deleteStudent = (args, callback) => {
  Batch.update(args.batchQueries, {
    $pull: { students: args.batchDetails },
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const deleteOne = (args, callback) => {
  Batch.deleteOne(args.batchQueries)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const findTeacherBatch = (args, callback) => {
  Batch.find(args.batchQueries)
    .populate("courseId")
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const addBatchFeeStructure = (args, callback) => {
  Batch.update(args.batchFeeStructureQueries, {
    $push: { feeStructure: args.batchFeeStructureDetails },
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const updateBatchFeeStructure = (args, callback) => {
  Batch.update(args.batchFeeStructureQueries, {
    $set: args.batchFeeStructureDetails,
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const deleteBatchFeeStructure = (args, callback) => {
  Batch.update(args.batchFeeStructureQueries, {
    $pull: { feeStructure: args.batchFeeStructureDetails },
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const pushStudent = (args, callback) => {
  Batch.update(args.batchQueries, { $push: args.batchDetails })
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const updateStudentFeeStructureInBatch = (args, callback) => {
  let batchFeeStructureFilter = [];
  for (var i = 0; i < args.batchFeeStructureFilter.length; i++) {
    var obj = args.batchFeeStructureFilter[i];
    let idMap = {};
    if (i == 0) {
      idMap["s.studentId"] = mongoose.Types.ObjectId(obj["s.studentId"]);
      batchFeeStructureFilter.push(idMap);
    } else {
      idMap["i._id"] = mongoose.Types.ObjectId(obj["i._id"]);
      batchFeeStructureFilter.push(idMap);
    }
  }

  Batch.update(
    args.batchFeeStructureQueries,
    {
      $set: args.batchFeeStructureDetails,
    },
    { arrayFilters: batchFeeStructureFilter }
  )
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const getStudentFeeStructureFromBatch = (args, callback) => {
  Batch.find(args.batchQueries1, {
    students: {
      $elemMatch: args.batchQueries2,
    },
  })
    .populate("courseId", "name courseImageUrl")
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const getStudentIsFirstInstallMentPaidStatus = (args, callback) => {
  Batch.find(args.batchQueries1, {
    students: {
      $elemMatch: args.batchQueries2,
    },
  })
    .populate("courseId")
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const batchIsFirstInstallmentPaidStudent = (args, callback) => {
  Batch.find(args.batchQueries)
    // .populate("courseId")
    .populate("students.studentId",'name imageUrl userId')
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findTeacherCourse = (args, callback) => {
  Batch.find(args.batchQueries)
    .sort({ dateTime: 1 })
    .select('courseId ')
    .populate("courseId")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
  addMultiple,
  find,
  findOne,
  update,
  addStudent,
  deleteStudent,
  deleteOne,
  findTeacherBatch,
  addBatchFeeStructure,
  updateBatchFeeStructure,
  deleteBatchFeeStructure,
  updateStudentFeeStructureInBatch,
  pushStudent,
  getStudentFeeStructureFromBatch,
  getStudentIsFirstInstallMentPaidStatus,
  batchIsFirstInstallmentPaidStudent,
  findTeacherCourse
};
