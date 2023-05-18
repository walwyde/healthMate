import React from "react";
import PropTypes from "prop-types";

const detailsForm = (props) => {
  const details = {
    professionalQualifications: [],
    employmentDetails: {
      organization: "",
      contact:"",
    workHistory: [],
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
    }}
  }
  
  return <div>detailsForm</div>;
};

detailsForm.propTypes = {};

export default detailsForm;
