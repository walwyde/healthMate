const mongoose = require("mongoose");

const BpProfileCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodPressureReadings: [
    {
      systolic: {
        type: Number,
        required: true,
      },
      diastolic: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  medications: [
    {
      name: {
        type: String,
        required: true,
      },
      dose: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
    },
  ],
  otherHealthConditions: {
    type: String,
    required: false,
  },
  familyHistory: {
    type: String,
    required: false,
  },
  allergies: {
    type: String,
    required: false,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  doctor: {
    docName: { type: String, required: false },
    docPhone: { type: String, required: false },
    docEmail: { type: String, required: false },
  },
});

const BpProfileCard = mongoose.model("bpProfileCard", BpProfileCardSchema);

module.exports = BpProfileCard;
