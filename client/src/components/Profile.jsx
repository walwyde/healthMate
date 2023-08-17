import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { loadCurrentProfile, deleteAccount } from "../Actions/profile";
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
  MDBCardLink,
  MDBInput,
} from "mdb-react-ui-kit";

const Profile = ({
  auth: { user, authloading },
  profile: { profile, loading },
  loadCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    loadCurrentProfile();
  }, [loading, authloading, loadCurrentProfile]);

  return loading && !profile ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        <MDBContainer className="m-1">
          {!authloading && user && !loading && profile === null ? (
            <MDBCard>
              <MDBCardImage
                fluid
                style={{ width: "400px", margin: "auto" }}
                src={!authloading && user && user.avatar}
                position="top"
                alt="..."
              />
              <MDBCardBody style={{ textAlign: "center" }}>
                <MDBCardTitle>
                  Hello {!authloading && user.name.split(" ")[0]}
                </MDBCardTitle>
                <MDBCardText>
                  Please Use This Link To Update Your Profile Card For Better
                  Experience.{" "}
                  <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </MDBCardText>
                <MDBCardLink
                  className="text-decoration-none text-info"
                  href="/create-profile"
                >
                  Create Card Profile
                </MDBCardLink>
              </MDBCardBody>
            </MDBCard>
          ) : (
            !loading &&
            profile &&
            !authloading && user && (
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
                          src={user.avatar}
                          alt="Generic placeholder image"
                          className="mt-4 mb-2 img-thumbnail"
                          fluid
                          style={{ width: "150px", zIndex: "1" }}
                        />
                      </div>
                      <div className="ms-3" style={{ marginTop: "130px" }}>
                        <MDBCardText tag="h5">
                          {profile.name && profile.name}
                        </MDBCardText>
                        <MDBCardText>{profile && profile.address}</MDBCardText>
                      </div>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        {/* <div>
                      <MDBCardText className="mb-1 h5">253</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div> */}
                        {/* <div className="px-3">
                      <MDBCardText className="mb-1 h5">1026</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div> */}
                        {/* <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div> */}
                      </div>
                    </div>
                    <MDBCardBody className="text-black p-4">
                      {!authloading &&
                        user &&
                        user.condition.hypertensive &&
                        !loading &&
                        profile && (
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
                                  Phone :{" "}
                                  <span>{profile && profile.phone}</span>
                                </MDBCardText>
                                <MDBCardText className="font-italic mb-0">
                                  Emergency Contact:{" "}
                                  <span>
                                    {profile && profile.emergencyContact}
                                  </span>
                                </MDBCardText>
                              </div>
                            </div>

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
                                  {(user &&
                                    user.condition.MDBBtndiabetic &&
                                    "Diabetic") ||
                                    (user &&
                                      user.condition.hypertensive &&
                                      "Hypertensive")}
                                </MDBCardText>
                                <MDBCardText className="font-italic mb-1">
                                  Age : <span>{profile && profile.age}</span>
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
                                    {profile && profile.otherHealthConditions}
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
                                  profile.bloodPressureReadings.map((bp) => (
                                    <MDBCardText
                                      key={bp._id}
                                      className="font-italic mb-1"
                                    >
                                      Systolic: - {bp.systolic}/ Diastolic -{" "}
                                      {bp.diastolic}
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

                      {!authloading &&
                        user.condition.diabetic &&
                        !loading &&
                        profile && (
                          <Fragment>
                            <div className="mb-5">
                              <p className="lead fw-normal mb-1">Basic Info</p>
                              <div
                                className="p-4"
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                <MDBCardText className="font-italic mb-1">
                                  Gender :{" "}
                                  <span>
                                    {profile.gender && profile.gender}
                                  </span>
                                </MDBCardText>
                                <MDBCardText className="font-italic mb-1">
                                  Phone :{" "}
                                  <span>{profile && profile.phone}</span>
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
                                  {(!authloading &&
                                    user &&
                                    user.condition.diabetic &&
                                    "Diabetic") ||
                                    (!authloading &&
                                      user &&
                                      user.condition.hypertensive &&
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

                      {!authloading && user && user.isStaff && (
                        <Fragment>
                          {!loading && profile && (
                            <MDBContainer>
                              <MDBCard>
                                <MDBCardBody>
                                  <h1 className="mt-4 text-primary text-center">
                                    Profile
                                  </h1>

                                  <MDBCardText className="font-italic mb-1">
                                    Gender:{" "}
                                    {!loading &&
                                      profile.gender &&
                                      profile.gender}
                                  </MDBCardText>

                                  <MDBCardText className="font-italic mb-1">
                                    Email:
                                    {!loading &&
                                      profile.contactDetails &&
                                      profile.contactDetails.email}
                                  </MDBCardText>

                                  <MDBCardText className="font-italic mb-1">
                                    NIN:
                                    {!loading && profile.nin && profile.nin}
                                  </MDBCardText>

                                  <MDBCardText className="font-italic mb-1">
                                    Phone:
                                    {!loading &&
                                      profile.contactDetails &&
                                      profile.contactDetails.phone}
                                  </MDBCardText>

                                  <MDBCardText className="font-italic mb-1">
                                    Address:
                                    {!loading &&
                                      profile.contactDetails &&
                                      profile.contactDetails.address}
                                  </MDBCardText>

                                  <MDBCardText className="font-italic mb-1">
                                    Age:{" "}
                                    {!loading && profile.age && profile.age}
                                  </MDBCardText>

                                  {!loading &&
                                    profile.user._id &&
                                    profile.user._id === !authloading &&
                                    user._id && (
                                      <Fragment>
                                        <MDBCardText className="font-italic mb-1">
                                          Licence Type:{" "}
                                          {!loading &&
                                            profile.licenceDetails &&
                                            profile.licenceDetails.licenceType}
                                        </MDBCardText>

                                        <MDBCardText variant="h5">
                                          Licence Number:{" "}
                                          {!loading &&
                                            profile.licenceDetails &&
                                            profile.licenceDetails.licenceNum}
                                        </MDBCardText>

                                        <MDBCardText variant="h5">
                                          Expiry Date:{" "}
                                          <Moment fromNow={"yyyy mm dd"}>
                                            {!loading &&
                                              profile.licenceDetails &&
                                              profile.licenceDetails.expiryDate}
                                          </Moment>
                                        </MDBCardText>
                                      </Fragment>
                                    )}

                                  <MDBCardText>
                                    Professional Designation:{" "}
                                    {!loading &&
                                      profile.professionalDesignation &&
                                      profile.professionalDesignation}
                                  </MDBCardText>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBContainer>
                          )}
                        </Fragment>
                      )}
                    </MDBCardBody>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Link
                        to={`/edit-user-profile/${!authloading && user._id}`}
                        className="text-center btn btn-primary"
                      >
                        Edit Profile
                      </Link>
                      <MDBBtn
                        className="text-center btn btn-danger"
                        onClick={deleteAccount}
                      >
                        delete Account
                      </MDBBtn>
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            )
          )}
        </MDBContainer>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  loadCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadCurrentProfile, deleteAccount })(
  Profile
);
