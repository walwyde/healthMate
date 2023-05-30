const mongoose = require("mongoose");

// define the schema
const healthWorkerSchema = new mongoose.Schema({
  title: {
    type: String,
    emun: ["doctor", "professor", "other"],
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
});

// create the model
const HealthWorker = mongoose.model("HealthWorker", healthWorkerSchema);

// export the model
module.exports = HealthWorker;
