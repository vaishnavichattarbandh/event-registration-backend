const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);







