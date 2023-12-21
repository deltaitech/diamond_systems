import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";
import { Col, Container, Row } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

import { useGetHomeDataQuery } from "../../slices/home-slice";

import "./FeaturesComponent.scss";
import PageTitleComponent from "../UI/PageTitle/PageTitleComponent";

const FeaturesComponent = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  const { data: homeData } = useGetHomeDataQuery();
  // Destructure data from homeData
  const { features } = homeData.data;

  return (
    <section className="featureSection">
      <Container
        className="featureContainer"
        dir={LanguageDirection(lang ?? defaultLang)}
      >
        {/* Page title */}
        <PageTitleComponent identifier={"feature_page"} />

        <Row xs={1} sm={1} md={3} lg={3} className="featureRow g-4">
          {features.map((feature, index) => (
            <Fade
              cascade
              damping={0.1}
              delay={index * 110}
              direction="down"
              key={index}
              className="d-flex flex-grow-4"
            >
              <Col className="featureCard">
                <i className={`${feature.icon} featureIcon`}></i>
                <h5 className="featureTitle">{feature.title}</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: feature.description }}
                  className="featureDescription text-limit"
                  style={{ "--lines": 2 }}
                ></div>
              </Col>
            </Fade>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesComponent;
