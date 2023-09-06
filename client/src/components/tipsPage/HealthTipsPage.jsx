import React, { Fragment } from "react";
import YouTubeEmbed from "./YoutubeEmbed";
import { Container, Row, Col, Card } from "react-bootstrap";

const HealthTipsPage = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="jumbotron container-fluid bg-info">
          <h1 className="display-4 text-center">Health Tips</h1>
          <p className="lead text-center">
            Here are some health tips to help you stay healthy.
          </p>
        </div>

        <div className="col-sm-12">
          <YouTubeEmbed embedId={"sGwb1KM0c5A"} />
        </div>

        <hr />

        <div className="row mt-2 bg-light">
          <div className="jumbotron mt-5 bg-warning container-fluid">
            <h1 className="display-4 text-center text-danger">
              Some Bad Food For You
            </h1>
          </div>
          <div className="mb-3 row">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://www.diabetescarecommunity.ca/wp-content/uploads/2020/02/Processed-meat.jpg"
                />
                <div className="card-body">
                  <h5 className="card-title">Processed meats</h5>
                </div>
              </div>
            </div>
            <div className="col-md-8 align-middle">
              <span className="align-middle">
                Processed meats – such as bacon, ham, salami or beef jerky –
                contain many harmful chemicals that are not present in fresh
                meat. They have also been linked to diseases such as cancer and
                heart disease in numerous studies. Replace processed meats with
                leaner, more natural protein choices, such as chicken, turkey,
                tuna or hard-boiled eggs.
              </span>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-md-8">
              Full-fat dairy products primarily contain saturated fat (the “bad”
              fat), which increases the risk of heart disease. As well, because
              higher-fat foods naturally contain more calories, full-fat dairy
              products may contribute to an increased risk of obesity. Replace
              full-fat dairy products with low-fat or non-fat dairy products and
              non-dairy milks (for example, almond or soy milk). When choosing
              low-fat products, always be on the lookout for other unhealthy
              ingredients that may have been added to replace the fat, such as
              sugar or saturated fats.
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://www.diabetescarecommunity.ca/wp-content/uploads/2020/02/Cheese.jpg"
                />
                <div className="card-body">
                  <h5 className="card-title">Full-fat dairy products</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://www.diabetescarecommunity.ca/wp-content/uploads/2020/02/Packaged-snacks.jpg"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Packaged snacks and processed baked goods
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              Most packaged pastries, cookies and cakes are made with refined
              sugar, refined wheat flour and unhealthy fats (such as shortening,
              which is high in trans fats). They also contain a number of
              chemical ingredients, including preservatives, and colouring and
              flavouring agents. As well, the carbohydrates in processed foods
              are usually refined, “simple” carbohydrates, which cause rapid
              spikes in blood sugar and insulin levels. Replace packaged snacks
              and processed baked goods with hummus and vegetables, a handful of
              almonds or apple slices topped with nut butter.
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-md-8">
              Breakfast cereals are some of the most commonly consumed processed
              foods that are high in added sugars. In fact, most of them list
              sugar as the second or third ingredient. Starting the day with a
              high-sugar breakfast cereal will spike your blood sugar and
              insulin levels. Excess consumption of sugar may also increase your
              risk of obesity, as well as heart disease and cancer. Replace
              sweetened breakfast cereals with oatmeal, homemade granola, or
              packaged breakfast cereals that contain little or no added sugar.
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://www.diabetescarecommunity.ca/wp-content/uploads/2020/02/sweetened-cereal.jpg"
                />
                <div className="card-body">
                  <h5 className="card-title">Sweetened breakfast cereals</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://www.diabetescarecommunity.ca/wp-content/uploads/2020/02/French-fries.jpg"
                />
                <div className="card-body">
                  <h5 className="card-title">Fried Foods</h5>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              Because French fries are deep fried in oil that contains unhealthy
              saturated fats, they are very high in fat and calories. This can
              pose a number of serious health risks (for example, heart disease
              and obesity) if you eat French fries on a regular basis. French
              fries may also contain a lot of salt, which can contribute to
              increased blood pressure levels. Replace French fries with
              vegetable sticks or baked sweet potato wedges.
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HealthTipsPage;
