const mongoose = require('mongoose')


const StaffprofileSchema = new mongoose.Schema({
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
})

const Staffprofile = mongoose.model('Staffprofile', StaffprofileSchema)

export default  Staffprofile