const express = require("express");
const router = express.Router();

const Package = require("../models/Package");

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE package
router.post("/", async (req, res) => {
  try {
    const count = await Package.countDocuments();
    const newPackageId = `P${String(count + 1).padStart(5, "0")}`;

    const newPackage = new Package({
      packageId: newPackageId,
      packageName: req.body.packageName,
      packageCategory: req.body.packageCategory,
      numberOfClasses: req.body.numberOfClasses,
      classType: req.body.classType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: req.body.price,
    });

    const savedPackage = await newPackage.save();

    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;