const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  instructorId: {
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
});

module.exports = mongoose.model("Instructor", instructorSchema);