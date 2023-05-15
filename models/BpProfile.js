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
  email: {
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
  lifestyleModifications: {
    type: String,
    required: false,
  },
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
});

const BpProfileCard = mongoose.model("ProfileCard", BpProfileCardSchema);

module.exports = BpProfileCard;
