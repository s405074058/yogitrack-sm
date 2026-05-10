const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
    unique: true,
  },

  instructorId: {
    type: String,
    required: true,
  },

  className: {
    type: String,
    required: true,
  },

  day: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  classType: {
    type: String,
    enum: ["General", "Special"],
    required: true,
  },

  payRate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Class", classSchema);