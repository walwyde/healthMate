const mongoose = require("mongoose");

// define the schema
const healthWorkerSchema = new mongoose.Schema({
  title: {
    type: String,
    emun: ["doctor", "professor", "other"],
  },
  name: {
    type: String,
    required: true,
  },
 user : {
type: mongoose.Schema.Types.ObjectId,
 ref: "User",
 },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Other"],
    required: true,
  },
  contactDetails: {
    address: {
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
  },
  nin: {
    type: String,
    required: true,
    unique: true,
  },
  professionalDesignation: {
    type: String,
    required: true,
  },
  licenceDetails: {
    licenceType: {
      type: String,
      enum: ["Medical", "Pharmacy", "Nursing", "Therapy"],
      required: true,
    },
    licenceNum: {
      type: String,
      required: true,
      unique: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  availability: [
    {
      day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        required: true,
      },
      time: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening"],
        required: true,
      },
    date: {
      type: Date,
      default: Date.now,
    },
  }
  ]

});

// create the model
const HealthWorker = mongoose.model("HealthWorker", healthWorkerSchema);

// export the model
module.exports = HealthWorker;
