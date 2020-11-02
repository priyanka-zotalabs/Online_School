require("../lib/dbHelper");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const feeStructureSchema = new Schema(
  {
    batchId: { type: Schema.Types.ObjectId, ref: "batches", required: true },
    name: { type: String, required: true },
    amount: { type: String, required: true },
    tax: { type: String },
    totalAmount: { type: String ,required: true},
    currency: { type: String ,required: true},
    numberOfInstallments: { type: String, required: true },
    durationBetweenInstallments: { type: String, required: true },
    installmentCalculator: [
      {
        _id: false,
        date: { type: Date },
        amount: { type: String },
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

const FeeStructure = mongoose.model("feeStructures", feeStructureSchema);

const addMultiple = (args, callback) => {
  FeeStructure.insertMany(args.feeStructureDetails, { ordered: false })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const find = (args, callback) => {
  FeeStructure.find(args.feeStructureQueries)
    .populate("batchId")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
  FeeStructure.findOne(args.feeStructureQueries)
    .populate("batchId")
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
  FeeStructure.update(
    args.feeStructureQueries,
    { $set: args.feeStructureDetails },
    { upsert: true }
  )
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const deleteOne = (args, callback) => {
  FeeStructure.deleteOne(args.feeStructureQueries)
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
  deleteOne,
};
