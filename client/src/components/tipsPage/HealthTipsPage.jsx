import React, { Fragment } from "react";
import YouTubeEmbed from "./YoutubeEmbed";
import { Container, Row, Col, Card } from "react-bootstrap";

const HealthTipsPage = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="jumbotron mt-4">
            <h1 className="display-4 text-center fw-bold">Health Tips</h1>
            <p className="lead">
              Here are some health tips to help you stay healthy.
            </p>
            <hr className="my-4" />

            <YouTubeEmbed embedId={"sGwb1KM0c5A"} />

            <hr />

            <div className="jumbotron mt-5 bg-secondary p-2">
              <h1 className="display-4 text-center">Some Bad Food For You</h1>
            </div>

<div className="row mt-2 bg-light">

  <div className="col-md-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Fried Foods</h5>
        <div className="card-image">
          <img className='rounded' src="https://picsum.photos/200"/>
        </div>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.

        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>

        </div>
        </div>
        </div>
        <div className="col-md-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nesciunt dolor sint deserunt? Molestias distinctio consequatur quasi amet pariatur accusamus rem labore doloremque error, corporis similique nihil facere possimus? Debitis dicta architecto distinctio ipsum incidunt libero totam aliquam repudiandae possimus?
          </div>
</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HealthTipsPage;
