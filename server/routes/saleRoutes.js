const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");
const Customer = require("../models/Customer");
const Package = require("../models/Package");

// GET all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE sale
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.findOne({ customerId: req.body.customerId });
    const packageItem = await Package.findOne({ packageId: req.body.packageId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (Number(req.body.amountPaid) !== Number(packageItem.price)) {
      return res.status(400).json({
        message: "Amount paid must match the package price",
      });
    }

    const count = await Sale.countDocuments();
    const newSaleId = `S${String(count + 1).padStart(5, "0")}`;

    const sale = new Sale({
      saleId: newSaleId,
      customerId: req.body.customerId,
      packageId: req.body.packageId,
      amountPaid: req.body.amountPaid,
      modeOfPayment: req.body.modeOfPayment,
      validityStartDate: req.body.validityStartDate,
      validityEndDate: req.body.validityEndDate,
    });

    const savedSale = await sale.save();

    if (packageItem.numberOfClasses !== "unlimited") {
      customer.classBalance += Number(packageItem.numberOfClasses);
    } else {
      customer.classBalance = 9999;
    }

    await customer.save();

    res.status(201).json({
      message: "Sale recorded and customer class balance updated",
      sale: savedSale,
      updatedCustomer: customer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;