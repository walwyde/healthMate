const mongoose = require('mongoose');

// define the schema
const healthWorkerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Other'],
    required: true
  },
  contactDetails: {
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  identificationNumber: {
    type: String,
    required: true,
    unique: true
  },
  professionalQualifications: [{
    institution: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    specialization: {
      type: String
    }
  }],
  professionalDesignation: {
    type: String,
    required: true
  },
  licenseDetails: {
    type: {
      type: String,
      enum: ['Medical', 'Pharmacy', 'Nursing', 'Therapy'],
      required: true
    },
    number: {
      type: String,
      required: true,
      unique: true
    },
    expiryDate: {
      type: Date,
      required: true
    }
  },
  employmentDetails: {
    organization: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  },
  workHistory: [{
    employer: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  }],
  additionalDetails: {
    languages: [{
      type: String
    }],
    skills: [{
      type: String
    }],
    areasOfExpertise: [{
      type: String
    }]
  }
});

// create the model
const HealthWorker = mongoose.model('HealthWorker', healthWorkerSchema);

// export the model
module.exports = HealthWorker;
