const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE customer
router.post("/", async (req, res) => {
  try {
    const count = await Customer.countDocuments();
    const newCustomerId = `C${String(count + 1).padStart(5, "0")}`;

    const customer = new Customer({
      customerId: newCustomerId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      preferredCommunication: req.body.preferredCommunication,
      classBalance: 0,
    });

    const savedCustomer = await customer.save();

    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;