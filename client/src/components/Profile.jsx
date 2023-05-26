import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
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
  MDBTypography,
  MDBCardLink,
  MDBInput,
} from "mdb-react-ui-kit";

function Profile({
  auth: { user, isStaff },
  profile: { profile, loading },
  loadCurrentProfile,
  deleteAccount,
}) {
  useEffect(() => {
    loadCurrentProfile();
  }, []);

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        <MDBContainer className="py-5 h-100">
          {!loading && profile === null
            ? user && (
                <MDBCard>
                  <MDBCardImage src={user.avatar} position="top" alt="..." />
                  <MDBCardBody>
                    <MDBCardTitle>Hello {user.name.split(" ")[0]}</MDBCardTitle>
                    <MDBCardText>
                      Please Use This Link To Update Your Profile Card For
                      Better Experience.
                    </MDBCardText>
                    <MDBBtn href={`/create-profile`}>
                      Create Card Profile
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              )
            : !loading &&
              user &&
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
                            src={user.avatar}
                            alt="Generic placeholder image"
                            className="mt-4 mb-2 img-thumbnail"
                            fluid
                            style={{ width: "150px", zIndex: "1" }}
                          />
                          <MDBBtn
                            outline
                            color="dark"
                            style={{ height: "36px", overflow: "visible" }}
                          >
                            Edit profile
                          </MDBBtn>
                        </div>
                        <div className="ms-3" style={{ marginTop: "130px" }}>
                          <MDBTypography tag="h5">{user.name}</MDBTypography>
                          <MDBCardText>
                            {profile && profile.address}
                          </MDBCardText>
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
                        {user && user.condition.hypertensive && (
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
                          </Fragment>
                        )}

                        {user && user.condition.diabetic && (
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

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBCardText className="lead fw-normal mb-0">
                            Appointments
                          </MDBCardText>
                        </div>
                        <MDBRow>
                          <MDBCol className="mb-2">
                            <MDBCard
                              className="mb-5"
                              style={{ borderRadius: "15px" }}
                            >
                              <MDBCardBody className="p-4">
                                <MDBTypography tag="h3">
                                  Session With Dr John Doe
                                </MDBTypography>
                                <MDBCardText className="small">
                                  <MDBIcon far icon="star" size="lg" />
                                  <span className="mx-2">|</span> Scheduled on{" "}
                                  <strong>date</strong> at address
                                </MDBCardText>
                                <hr className="my-4" />
                                <div className="d-flex justify-content-start align-items-center">
                                  <MDBCardText className="text-uppercase mb-0">
                                    <MDBIcon fas icon="ellipsis-h ms-4 me-2" />{" "}
                                    <span className="text-muted small">
                                      <MDBBtn
                                        outline
                                        color="dark"
                                        floating
                                        size="sm"
                                      >
                                        Delete
                                      </MDBBtn>
                                    </span>{" "}
                                    <span className="ms-3 me-4">|</span>
                                  </MDBCardText>
                                  <a href="#!">
                                    <MDBCardImage
                                      width="35"
                                      src={user.avatar}
                                      alt="avatar"
                                      className="rounded-circle me-3"
                                      fluid
                                    />
                                  </a>
                                  {/* <MDBBtn outline color="dark" floating size="sm">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn> */}
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBCardLink
                          href={`/edit-user-profile/${user._id}`}
                          className="text-center btn btn-primary"
                        >
                          Edit Profile
                        </MDBCardLink>
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
              )}
        </MDBContainer>
      </div>
    </Fragment>
  );
}

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
