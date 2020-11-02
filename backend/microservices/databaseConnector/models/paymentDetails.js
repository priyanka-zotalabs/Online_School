require("../lib/dbHelper");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentDetailsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "batches",
      required: true,
    },
    installmentId: { type: Schema.Types.ObjectId },
    amount: { type: String, required: true },
    currency_code: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    orderId: { type: String },
    captureId: { type: String },
    //invoice_id: { type: String },
    //transaction_id: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const PaymentDetails = mongoose.model("paymentDetails", paymentDetailsSchema);

const addMultiple = (args, callback) => {
  PaymentDetails.insertMany(args.paymentDetailss, {
    ordered: false,
  })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      new Error(JSON.stringify(err));
    });
};

const find = (args, callback) => {
  PaymentDetails.find(args.paymentDetailsQueries)
    .then((res) => callback(null, res))
    .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
  addMultiple,
  find,
};
