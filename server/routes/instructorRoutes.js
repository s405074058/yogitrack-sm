const express = require("express");
const router = express.Router();

const Instructor = require("../models/Instructor");


// GET all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE instructor
router.post("/", async (req, res) => {
  try {

    const count = await Instructor.countDocuments();

    const newInstructorId = `I${String(count + 1).padStart(5, "0")}`;

    const instructor = new Instructor({
      instructorId: newInstructorId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      preferredCommunication: req.body.preferredCommunication,
    });

    const savedInstructor = await instructor.save();

    res.status(201).json(savedInstructor);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;