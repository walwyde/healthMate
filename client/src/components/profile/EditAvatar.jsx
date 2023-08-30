import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";

import { updateProfileImage } from "../../Actions/profile";

const EditAvatar = ({ updateProfileImage, match, history }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let formData = {};
    formData.avatar = selectedFile;
    formData.userId = match.params.id;

    updateProfileImage(formData);

    history.push("/profile")
  };

  return (
    <Fragment>
      <div className="jumbotron">
        <h3 className="text-center text-primary">Update Profile Image</h3>
      </div>
      <div>
        <Dropzone onDrop={handleFileDrop} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone form-control">
              <input {...getInputProps()} />
              <p>Drag and drop an image here or click to select.</p>
            </div>
          )}
        </Dropzone>
        <button className="btn btn-primary m-3" onClick={handleUpload}>
          Upload Image
        </button>
      </div>
    </Fragment>
  );
};

EditAvatar.propTypes = {
  updateProfileImage: PropTypes.func.isRequired,
};

export default connect(null, { updateProfileImage })(EditAvatar);
