const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  saleId: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  packageId: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  modeOfPayment: {
    type: String,
    enum: ["Cash", "Card", "Online"],
    required: true,
  },
  paymentDateTime: {
    type: Date,
    default: Date.now,
  },
  validityStartDate: {
    type: Date,
    required: true,
  },
  validityEndDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Sale", saleSchema);