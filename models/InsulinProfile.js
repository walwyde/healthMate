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
  phone: {
    type: String,
    required: true,
  },
  diagnosisDate: {
    type: Date,
    required: false,
  },
  typeOfDiabetes: {
    type: String,
    required: false,
  },
  medicatons: [
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
      readingDate: { type: String, required: false },
      readingTime: { type: String, required: false },
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

const InsulinProfile = mongoose.model("Profile", InsulinProfileSchema);

module.exports = InsulinProfile;
