const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const Customer = require("../models/Customer");
const Class = require("../models/Class");

// GET all attendance records
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE attendance record
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.findOne({ customerId: req.body.customerId });
    const classItem = await Class.findOne({ classId: req.body.classId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    let warning = "";

    if (customer.classBalance <= 0) {
      warning = "Warning: customer has no class balance. Balance will become negative.";
    }

    customer.classBalance -= 1;
    await customer.save();

    const count = await Attendance.countDocuments();
    const newAttendanceId = `A${String(count + 1).padStart(5, "0")}`;

    const attendance = new Attendance({
      attendanceId: newAttendanceId,
      classId: req.body.classId,
      customerId: req.body.customerId,
      attendanceDateTime: req.body.attendanceDateTime || Date.now(),
    });

    const savedAttendance = await attendance.save();

    res.status(201).json({
      message: "Attendance recorded and customer balance updated",
      warning,
      attendance: savedAttendance,
      updatedCustomer: customer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;