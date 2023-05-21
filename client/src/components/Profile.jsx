import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { loadCurrentProfile } from "../Actions/profile";
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
} from "mdb-react-ui-kit";

const Profile = ({ profile: { profile, loading }, loadCurrentProfile }) => {
  useEffect(() => {
    loadCurrentProfile();
  }, []);
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        {profile === null && !loading ? (
          
              <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
                <MDBCardBody>
                  <MDBCardTitle>Hello User</MDBCardTitle>
                  <MDBCardText>
                    Please Use This Link To Update Your Profile Card For Better Experience.
                  </MDBCardText>
                  <MDBBtn href='/edit-user-profile/123334'>Edit Card Profile</MDBBtn>
                </MDBCardBody>
              </MDBCard>
        ) : (
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
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
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
                    <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
                    <MDBCardText>New York</MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">253</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">1026</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        Web Developer
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        Lives in New York
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-0">
                        Photographer
                      </MDBCardText>
                    </div>
                  </div>
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
                          <MDBTypography tag="h3">Program Title</MDBTypography>
                          <MDBCardText className="small">
                            <MDBIcon far icon="star" size="lg" />
                            <span className="mx-2">|</span> Created by{" "}
                            <strong>MDBootstrap</strong> on 11 April , 2021
                          </MDBCardText>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-start align-items-center">
                            <MDBCardText className="text-uppercase mb-0">
                              <MDBIcon fas icon="ellipsis-h ms-4 me-2" />{" "}
                              <span className="text-muted small">
                                program link
                              </span>{" "}
                              <span className="ms-3 me-4">|</span>
                            </MDBCardText>
                            <a href="#!">
                              <MDBCardImage
                                width="35"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                                alt="avatar"
                                className="rounded-circle me-3"
                                fluid
                              />
                            </a>
                            <MDBBtn outline color="dark" floating size="sm">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  loadCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { loadCurrentProfile })(Profile);
