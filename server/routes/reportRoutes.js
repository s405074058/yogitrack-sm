const express = require("express");
const router = express.Router();

const Instructor = require("../models/Instructor");
const Customer = require("../models/Customer");
const Package = require("../models/Package");
const Class = require("../models/Class");
const Sale = require("../models/Sale");
const Attendance = require("../models/Attendance");

// Package sales report
router.get("/sales", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Instructors list
router.get("/instructors", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    const classes = await Class.find();
    const attendance = await Attendance.find();

    const report = instructors.map((instructor) => {
      const instructorClasses = classes.filter(
        (c) => c.instructorId === instructor.instructorId
      );

      const checkIns = instructorClasses.reduce((total, classItem) => {
        return (
          total +
          attendance.filter((a) => a.classId === classItem.classId).length
        );
      }, 0);

      return {
        instructorId: instructor.instructorId,
        name: `${instructor.firstName} ${instructor.lastName}`,
        classes: instructorClasses,
        totalCheckIns: checkIns,
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Customer list
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    const sales = await Sale.find();

    const report = customers.map((customer) => {
      const customerSales = sales.filter(
        (sale) => sale.customerId === customer.customerId
      );

      return {
        customerId: customer.customerId,
        name: `${customer.firstName} ${customer.lastName}`,
        classBalance: customer.classBalance,
        packages: customerSales,
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Teacher payment report
router.get("/teacher-payments", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    const classes = await Class.find();
    const attendance = await Attendance.find();

    const report = instructors.map((instructor) => {
      const instructorClasses = classes.filter(
        (c) => c.instructorId === instructor.instructorId
      );

      let totalPayment = 0;

      instructorClasses.forEach((classItem) => {
        const checkIns = attendance.filter(
          (a) => a.classId === classItem.classId
        ).length;

        totalPayment += checkIns * classItem.payRate;
      });

      return {
        instructorId: instructor.instructorId,
        name: `${instructor.firstName} ${instructor.lastName}`,
        totalPayment,
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;