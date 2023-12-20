import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";

import "./CounterComponent.scss";
import { Slide, Zoom } from "react-awesome-reveal";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";

const CounterComponent = ({ counters, counterPage }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const targetRef = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
    targetRef;
  }, [targetRef, lang]);

  const firstCounter = counters[0];
  const secondCounter = counters[1];

  return (
    <section
      className="counterSection"
      style={{ backgroundImage: `url(${counterPage.image})` }}
    >
      <Container className="counterContainer">
        <Row>
          {/* FirstCounter */}
          <Col lg={4} md={4} sm={12} xs={12} className="counterColumn">
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
              <CountUp
                target={targetRef}
                start={0}
                end={firstCounter.number}
                duration={3}
                separator=""
                decimals={0}
                decimal=","
                prefix=""
                suffix=""
                startOnMount={true}
                enableScrollSpy={true}
                className="countingNumber"
              >
                {({ countUpRef }) => (
                  <div className="countingNumber">
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
              <h4 className="counterTitle">{firstCounter.title}</h4>
            </Slide>
          </Col>

          {/* Page */}
          <Col lg={4} md={4} sm={12} xs={12} className="counterDescription">
            <Zoom>
              <div
                dangerouslySetInnerHTML={{ __html: counterPage.description }}
              ></div>
            </Zoom>
          </Col>

          {/* Second Counter */}
          <Col lg={4} md={4} sm={12} xs={12} className="counterColumn">
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
              <CountUp
                target={targetRef}
                start={0}
                end={secondCounter.number}
                duration={3}
                separator=""
                decimals={0}
                decimal=","
                prefix=""
                suffix=""
                startOnMount={true}
                enableScrollSpy={true}
                className="countingNumber"
              >
                {({ countUpRef }) => (
                  <div className="countingNumber">
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
              <h4 className="counterTitle">{secondCounter.title}</h4>
            </Slide>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CounterComponent;
