import React, { Fragment } from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => {
  return (
    <Fragment>
      <div className="ratio ratio-16x9 bg-light my-3">
        <iframe
          src={`https://www.youtube.com/embed/${embedId}?rel=0`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
