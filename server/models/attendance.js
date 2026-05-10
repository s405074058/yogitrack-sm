const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  attendanceId: {
    type: String,
    required: true,
    unique: true,
  },
  classId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  attendanceDateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);