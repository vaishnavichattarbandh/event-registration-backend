const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    fullName: { type: String, required: true },
    rollNo: String,
    department: String,
    stream: String,
    year: String,
    semester: String,
    email: { type: String, required: true },
    contact: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);






