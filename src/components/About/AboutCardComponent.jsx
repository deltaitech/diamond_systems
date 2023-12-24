import React from "react";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Slide } from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceholderImage from "../../assets/favicon.png";

import "./AboutCardComponent.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

const AboutCardComponent = ({ item, index, setLightbox }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  return (
    <Container>
      <Row className="aboutRow">
        <Col lg={6} md={6} sm={12} xs={12} className="overflow-hidden">
          <Slide
            cascade
            direction={
              index % 2 === 0
                ? LanguageDirection(lang ?? defaultLang) === "rtl"
                  ? "left"
                  : "right"
                : LanguageDirection(lang ?? defaultLang) === "rtl"
                ? "right"
                : "left"
            }
            damping={0.1}
            delay={90}
            className="h-100"
          >
            <LazyLoadImage
              src={item?.image}
              alt={item?.title}
              className="aboutImage"
              placeholderSrc={PlaceholderImage}
              effect="blur"
              onClick={() => setLightbox({ isOpen: true, index: index })}
            />
          </Slide>
        </Col>

        <Col lg={6} md={6} sm={12} xs={12} className="aboutDetails">
          <Slide
            cascade
            direction={
              index % 2 === 0
                ? LanguageDirection(lang ?? defaultLang) === "rtl"
                  ? "right"
                  : "left"
                : LanguageDirection(lang ?? defaultLang) === "rtl"
                ? "left"
                : "right"
            }
            damping={0.1}
            delay={90}
          >
            <h1 className="aboutTitle">{item?.title}</h1>
            <div
              className="aboutDescription"
              dangerouslySetInnerHTML={{
                __html: item?.description,
              }}
            ></div>
          </Slide>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutCardComponent;
