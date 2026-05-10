const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  preferredCommunication: {
    type: String,
    enum: ["phone", "email"],
    required: true,
  },
  classBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Customer", customerSchema);