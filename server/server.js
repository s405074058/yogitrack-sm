
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const instructorRoutes = require("./routes/instructorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const packageRoutes = require("./routes/packageRoutes");
const classRoutes = require("./routes/classRoutes");
const saleRoutes = require("./routes/saleRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/instructors", instructorRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/reports", reportRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("YogiTrack API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});