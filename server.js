require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ExcelJS = require("exceljs");

const connectDB = require("./db");
const Registration = require("./models/Registration");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

/* CREATE REGISTRATION */
app.post("/api/registrations", async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* FETCH REGISTRATIONS */
app.get("/api/registrations", async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const query = {
    $or: [
      { eventName: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } }
    ]
  };

  const total = await Registration.countDocuments(query);
  const data = await Registration.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ data, totalPages: Math.ceil(total / limit) });
});

/* TEST ROUTE */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);
