require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ExcelJS = require("exceljs");

const connectDB = require("./db");
const Registration = require("./models/registration");
const eventRoutes = require("./routes/eventroutes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   TEST ROUTE
========================= */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

/* =========================
   EVENT ROUTES
========================= */
app.use("/api/events", eventRoutes);

/* =========================
   CREATE REGISTRATION
========================= */
app.post("/api/registrations", async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

/* =========================
   FETCH REGISTRATIONS
   (Pagination + Search)
========================= */
app.get("/api/registrations", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const query = {
      $or: [
        { eventName: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Registration.countDocuments(query);
    const data = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* =========================
   DELETE REGISTRATION
========================= */
app.delete("/api/registrations/:id", async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

/* =========================
   EXPORT TO EXCEL
========================= */
app.get("/api/registrations/export/excel", async (req, res) => {
  try {
    const registrations = await Registration.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registrations");

    worksheet.columns = [
      { header: "Full Name", key: "fullName", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Event Name", key: "eventName", width: 25 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Date", key: "createdAt", width: 20 },
    ];

    registrations.forEach((reg) => {
      worksheet.addRow(reg);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=registrations.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel Export Error:", err);
    res.status(500).json({ message: "Excel export failed" });
  }
});

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Event Registration Backend is running 🚀");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

