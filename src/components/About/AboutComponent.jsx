import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import CustomButton from "../UI/CustomButton/CustomButton";
import {
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../utils/Helpers/General";
import { Slide } from "react-awesome-reveal";

import "./AboutComponent.scss";

const AboutComponent = ({ about, hasButton = false }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);
  const aboutLocation = location.pathname.includes("about") ? true : false;
  return (
    <section
      className="aboutSection"
      style={{
        paddingBlockStart: aboutLocation ? "5rem" : "7rem",
      }}
    >
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="aboutDescription">
            <Slide
              cascade
              direction={
                LanguageDirection(lang ?? defaultLang) === "rtl"
                  ? "right"
                  : "left"
              }
              damping={0.1}
              delay={90}
            >
              <h2 className="aboutTitle">{about.title}</h2>
            </Slide>
            <Slide
              cascade
              direction={
                LanguageDirection(lang ?? defaultLang) === "rtl"
                  ? "right"
                  : "left"
              }
              damping={0.1}
              delay={90}
            >
              <div
                dangerouslySetInnerHTML={{ __html: about.description }}
                className={hasButton && "text-limit"}
                style={{ "--lines": 7 }}
              ></div>
            </Slide>
            {hasButton && (
              <Slide
                cascade
                direction={
                  LanguageDirection(lang ?? defaultLang) === "rtl"
                    ? "right"
                    : "left"
                }
                damping={0.1}
                delay={110}
                className="d-flex justify-content-center align-items-center"
              >
                <CustomButton
                  link={isMultiLang ? `/${lang}/about` : `/about`}
                  linkTitle={t("words:read_more")}
                />
              </Slide>
            )}
          </Col>

          <Col lg={6} md={6} sm={12} xs={12} className="aboutImg">
            <Slide
              cascade
              direction={
                LanguageDirection(lang ?? defaultLang) === "rtl"
                  ? "left"
                  : "right"
              }
              damping={0.1}
              delay={90}
            >
              <Image
                fluid
                src={about.image}
                alt="About Image"
                // className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Slide>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutComponent;
