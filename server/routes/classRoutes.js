const express = require("express");
const router = express.Router();

const Class = require("../models/Class");


// GET all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE class
router.post("/", async (req, res) => {
  try {

    // check schedule conflict
    const existingClass = await Class.findOne({
      day: req.body.day,
      time: req.body.time,
    });

    if (existingClass) {
      return res.status(400).json({
        message: "Schedule conflict. Another class already exists at this time.",
      });
    }

    const count = await Class.countDocuments();

    const newClassId = `CL${String(count + 1).padStart(5, "0")}`;

    const newClass = new Class({
      classId: newClassId,
      instructorId: req.body.instructorId,
      className: req.body.className,
      day: req.body.day,
      time: req.body.time,
      classType: req.body.classType,
      payRate: req.body.payRate,
    });

    const savedClass = await newClass.save();

    res.status(201).json(savedClass);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;