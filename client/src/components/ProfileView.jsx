import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { getProfileById, deleteAccount } from "../Actions/profile";
import {
  MDBIcon,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBBtn,
  MDBTypography,
  MDBCardLink,
  MDBInput,
} from "mdb-react-ui-kit";

function Profile({
  auth: { user, loading: authloading },
  profile: { profile, loading },
  getProfileById,
  match,
  history,
}) {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [loading, authloading, getProfileById, match.params.id]);

  const navigate = (location) => {
    history.push(location);
  };

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        {!loading && profile === null ? (
          <Fragment>
            <div className="jumbotron text-center lead mb-2">
              <h3>Profile View</h3>
            </div>

            <div className="mt-2">
              <MDBCard>
                <MDBCardTitle></MDBCardTitle>
                <MDBCardBody style={{ textAlign: "center" }}>
                  <MDBCardText>
                    This User Doesn't have a Profile Yet.
                  </MDBCardText>

                  <Link to="/appointments" className="btn btn-sm btn-primary">
                    Go Back
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </div>
          </Fragment>
        ) : (
          !loading &&
          profile && (
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard>
                  <div
                    className="rounded-top text-white d-flex flex-row"
                    style={{ backgroundColor: "#000", height: "200px" }}
                  >
                    <div
                      className="ms-4 mt-5 d-flex flex-column"
                      style={{ width: "150px" }}
                    >
                      <MDBCardImage
                        src={profile.user.avatar}
                        alt="Generic placeholder image"
                        className="mt-4 mb-2 img-thumbnail"
                        fluid
                        style={{ width: "150px", zIndex: "1" }}
                      />
                    </div>
                    <div className="ms-3" style={{ marginTop: "130px" }}>
                      <MDBCardText>{profile && profile.user.name}</MDBCardText>
                      <MDBCardText>{profile && profile.address}</MDBCardText>
                    </div>
                    <div></div>
                  </div>
                  <Link
                    className="btn btn-primary"
                    to={`/message/${profile.user._id}`}
                  >
                    Message
                  </Link>
                  <div
                    className="p-4 text-black"
                    style={{ backgroundColor: "#f8f9fa" }}
                  ></div>
                  <MDBCardBody className="text-black p-4">
                    {profile.user.condition &&
                      profile.user.condition.hypertensive && (
                        <Fragment>
                          <div className="mb-5">
                            <p className="lead fw-normal mb-1">Basic Info</p>
                            <div
                              className="p-4"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <MDBCardText className="font-italic mb-1">
                                Gender :{" "}
                                <span>{profile && profile.gender}</span>
                              </MDBCardText>
                              <MDBCardText className="font-italic mb-1">
                                Phone : <span>{profile && profile.phone}</span>
                              </MDBCardText>
                              <MDBCardText className="font-italic mb-0">
                                Emergency Contact:{" "}
                                <span>
                                  {profile && profile.emergencyContact}
                                </span>
                              </MDBCardText>
                            </div>
                          </div>

                          {!authloading &&
                            user.isStaff &&
                            !loading &&
                            profile && (
                              <Fragment>
                                <div className="mb-5">
                                  <p className="lead fw-normal mb-1">
                                    Personal Info
                                  </p>
                                  <div
                                    className="p-4"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                  >
                                    <MDBCardText className="font-italic mb-1">
                                      Health Condition:{" "}
                                      {(profile &&
                                        profile.user.condition.diabetic &&
                                        "Diabetic") ||
                                        (profile &&
                                          profile.user.condition.hypertensive &&
                                          "Hypertensive")}
                                    </MDBCardText>
                                    <MDBCardText className="font-italic mb-1">
                                      Age :{" "}
                                      <span>{profile && profile.age}</span>
                                    </MDBCardText>
                                    <MDBCardText className="font-italic mb-0">
                                      Family History:{" "}
                                      <span>
                                        {profile && profile.familyHistory}
                                      </span>
                                    </MDBCardText>

                                    <MDBCardText className="font-italic mb-0">
                                      Other Conditions:{" "}
                                      <span>
                                        {profile &&
                                          profile.otherHealthConditions}
                                      </span>
                                    </MDBCardText>

                                    <MDBCardText className="font-italic mb-0">
                                      Allergies:{" "}
                                      <span>
                                        {profile.allergies && profile.allergies}
                                      </span>
                                    </MDBCardText>
                                  </div>
                                </div>

                                <div className="mb-5">
                                  <p className="lead fw-normal mb-1">
                                    Blood Pressure Readings
                                  </p>
                                  <div
                                    className="p-4"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                  >
                                    {profile.bloodPressureReadings &&
                                      profile.bloodPressureReadings.map(
                                        (bp) => (
                                          <MDBCardText
                                            key={bp._id}
                                            className="font-italic mb-1"
                                          >
                                            Systolic: - {bp.systolic}/ Diastolic
                                            - {bp.diastolic}
                                          </MDBCardText>
                                        )
                                      )}
                                  </div>
                                </div>

                                <div className="mb-5">
                                  <p className="lead fw-normal mb-1">
                                    Medications
                                  </p>
                                  <div
                                    className="p-4"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                  >
                                    {profile.medications &&
                                      profile.medications.map((med) => (
                                        <div key={med._id}>
                                          <MDBCardText className="font-italic mb-1">
                                            Medication Name: {med.name}
                                          </MDBCardText>

                                          <MDBCardText className="font-italic mb-1">
                                            Dosage: {med.dose}
                                          </MDBCardText>

                                          <MDBCardText className="font-italic mb-1">
                                            Frequency: {med.frequency}
                                          </MDBCardText>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </Fragment>
                            )}

                          <div className="mb-5">
                            <p className="lead fw-bold fs-1 mb-1">Doctor</p>
                            <div
                              className="p-4"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <MDBCardText className="font-italic mb-1">
                                Doctor Name:{" "}
                                {profile.doctor && profile.doctor.docName}
                              </MDBCardText>

                              <MDBCardText className="font-italic mb-1">
                                Doctor Phone:{" "}
                                {profile.doctor && profile.doctor.docPhone}
                              </MDBCardText>

                              <MDBCardText className="font-italic mb-1">
                                Doctor Email:{" "}
                                {profile.doctor && profile.doctor.docEmail}
                              </MDBCardText>
                            </div>
                          </div>
                        </Fragment>
                      )}

                    {!loading && profile.user.condition && profile.user.condition.diabetic && (
                      <Fragment>
                        <div className="mb-5">
                          <p className="lead fw-normal mb-1">Basic Info</p>
                          <div
                            className="p-4"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <MDBCardText className="font-italic mb-1">
                              Gender :{" "}
                              <span>{profile.gender && profile.gender}</span>
                            </MDBCardText>
                            <MDBCardText className="font-italic mb-1">
                              Phone : <span>{profile && profile.phone}</span>
                            </MDBCardText>
                            <MDBCardText className="font-italic mb-0">
                              Emergency Contact:{" "}
                              <span>
                                {profile.emergencyContact &&
                                  profile.emergencyContact.contactName}
                              </span>
                            </MDBCardText>

                            <MDBCardText className="font-italic mb-0">
                              Emergency Contact Phone:{" "}
                              <span>
                                {profile.emergencyContact &&
                                  profile.emergencyContact.contactPhone}
                              </span>
                            </MDBCardText>
                          </div>
                        </div>

                        {!authloading && user.isStaff && (
                          <Fragment>
                            <div className="mb-5">
                              <p className="lead fw-normal mb-1">
                                Personal Info
                              </p>
                              <div
                                className="p-4"
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                <MDBCardText className="font-italic mb-1">
                                  Health Condition:{" "}
                                  {(profile &&
                                    profile.user.condition.diabetic &&
                                    "Diabetic") ||
                                    (profile &&
                                      profile.user.condition.hypertensive &&
                                      "Hypertensive")}
                                </MDBCardText>
                                <MDBCardText className="font-italic mb-1">
                                  Age : <span>{profile && profile.age}</span>
                                </MDBCardText>
                                <MDBCardText className="font-italic mb-0">
                                  Type Of Diabetes:{" "}
                                  <span>
                                    {profile && profile.typeOfDiabetes}
                                  </span>
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-0">
                                  Diagnosis Date:{" "}
                                  <span>
                                    {profile.diagnosisDate && (
                                      <Moment format="DD/MM/YYYY">
                                        {profile.diagnosisDate}
                                      </Moment>
                                    )}
                                  </span>
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-0">
                                  Allergies:{" "}
                                  <span>{profile && profile.allergies}</span>
                                </MDBCardText>
                              </div>
                            </div>

                            <div className="mb-5">
                              <p className="lead fw-normal mb-1">
                                Glucose Readings
                              </p>
                              <div
                                className="p-4"
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                {profile &&
                                  profile.glucoseReadings.map((gr) => (
                                    <MDBCardText
                                      key={gr._id}
                                      className="font-italic mb-1"
                                    >
                                      Glucose Level: - {gr.glucoseLevel}/
                                      Reading Date -{" "}
                                      <Moment format="DD/MM/YYYY">
                                        {gr.readingDate}
                                      </Moment>
                                    </MDBCardText>
                                  ))}
                              </div>
                            </div>

                            <div className="mb-5">
                              <p className="lead fw-normal mb-1">Medications</p>
                              <div
                                className="p-4"
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                {profile.medications &&
                                  profile.medications.map((med) => (
                                    <div key={med._id}>
                                      <MDBCardText className="font-italic mb-1">
                                        Medication Name: {med.medName}
                                      </MDBCardText>

                                      <MDBCardText className="font-italic mb-1">
                                        Dosage: {med.medDose}
                                      </MDBCardText>

                                      <MDBCardText className="font-italic mb-1">
                                        Frequency: {med.frequency}
                                      </MDBCardText>

                                      {profile.insulinDose &&
                                        profile.insulinDose.map((insulin) => (
                                          <div key={insulin._id}>
                                            <MDBCardText className="font-italic mb-1">
                                              Insulin Type:{" "}
                                              {insulin.insulinType}
                                            </MDBCardText>
                                          </div>
                                        ))}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </Fragment>
                        )}

                        <div className="mb-5">
                          <p className="lead fw-bold fs-1 mb-1">Doctor</p>
                          <div
                            className="p-4"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <MDBCardText className="font-italic mb-1">
                              Doctor Name:{" "}
                              {profile.doctor && profile.doctor.docName}
                            </MDBCardText>

                            <MDBCardText className="font-italic mb-1">
                              Doctor Phone:{" "}
                              {profile.doctor && profile.doctor.docPhone}
                            </MDBCardText>

                            <MDBCardText className="font-italic mb-1">
                              Doctor Email:{" "}
                              {profile.doctor && profile.doctor.docEmail}
                            </MDBCardText>
                          </div>
                        </div>
                      </Fragment>
                    )}

                    {profile.user && profile.user.isStaff && (
                      <Fragment>
                        {!loading && profile && (
                          <MDBContainer>
                            <MDBCard>
                              <MDBCardBody>
                                <h1 className="mt-4 text-primary text-center">
                                  Profile
                                </h1>

                                <MDBCardText className="font-italic mb-1">
                                  Gender: {profile.gender && profile.gender}
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-1">
                                  Email:
                                  {profile.contactDetails.email}
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-1">
                                  NIN:
                                  {profile.nin}
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-1">
                                  Phone:
                                  {profile.contactDetails.phone}
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-1">
                                  Address:
                                  {profile.contactDetails.address}
                                </MDBCardText>

                                <MDBCardText className="font-italic mb-1">
                                  Age: {profile.age}
                                </MDBCardText>

                                {profile.user &&
                                  profile.user._id === !authloading && user._id && (
                                    <Fragment>
                                      <MDBCardText className="font-italic mb-1">
                                        Licence Type:{" "}
                                        {profile.licenceDetails &&
                                          profile.licenceDetails.licenceType}
                                      </MDBCardText>

                                      <MDBCardText variant="h5">
                                        Licence Number:{" "}
                                        {profile.licenceDetails &&
                                          profile.licenceDetails.licenceNum}
                                      </MDBCardText>

                                      <MDBCardText variant="h5">
                                        Expiry Date:{" "}
                                        <Moment fromNow={"yyyy mm dd"}>
                                          {profile.licenceDetails &&
                                            profile.licenceDetails.expiryDate}
                                        </Moment>
                                      </MDBCardText>
                                    </Fragment>
                                  )}

                                <MDBCardText>
                                  Professional Designation:{" "}
                                  {profile.professionalDesignation &&
                                    profile.professionalDesignation}
                                </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBContainer>
                        )}
                      </Fragment>
                    )}
                  </MDBCardBody>
                </MDBCard>
                <div className="form-group">
                  <button
                    onClick={() => navigate("/appointments")}
                    className="btn btn-primary btn-sm"
                  >
                    Go Back
                  </button>
                </div>
              </MDBCol>
            </MDBRow>
          )
        )}
      </div>
    </Fragment>
  );
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(
  withRouter(Profile)
);
