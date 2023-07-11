const mongoose = require("mongoose");

const InsulinProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  diagnosisDate: {
    type: Date,
    default: Date.now,
  },
  typeOfDiabetes: {
    type: String,
    required: false,
  },
  medications: [
    {
      medName: { type: String, required: false },
      medDose: { type: String, required: false },
      frequency: { type: String, required: false },
    },
  ],
  allergies: {
    type: String,
    required: false,
  },
  emergencyContact: {
    contactName: { type: String, required: false },
    contactPhone: { type: String, required: false },
  },
  glucoseReadings: [
    {
      readingDate: { type: Date, default: Date.now },
      glucoseLevel: { type: String, required: false },
    },
  ],
  insulinDose: [
    {
      insulinType: { type: String, required: false },
    },
  ],

  doctor: {
    docName: { type: String, required: false },
    docPhone: { type: String, required: false },
    docEmail: { type: String, required: false },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const InsulinProfile = mongoose.model("insulinProfile", InsulinProfileSchema);

module.exports = InsulinProfile;
