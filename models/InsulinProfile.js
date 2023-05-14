const mongoose = require("mongoose");

const InsulinProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contactInfo: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
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
      name: {type: String, required: false},
      dosage: {type: String, required: false},
      frequency: {type: String, required: false},
      startDate: {type: Date, required: false},
      endDate: {type: Date, required: false},
    },
  ],
  allergies: [
    {
      name: {type: String, required: false},
      severity: {type: String, required: false},
    },
  ],
  emergencyContact: {
    name: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false},
  },
  glucoseReadings: [
    {
      date: {type: String, required: false},
      time: {type: String, required: false},
      glucoseLevel: {type: String, required: false},
    },
  ],
  insulinDose: [
    {
      insulinType: {type: String, required: false},
    },
  ],
  complications: [
    {
      name: {type: String, required: false},
      severity: {type: String, required: false},
    },
  ],
  doctor: {
    name: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = InsulinProfile = mongoose.model("Profile", InsulinProfileSchema);
