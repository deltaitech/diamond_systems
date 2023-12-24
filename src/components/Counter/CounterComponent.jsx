import React, { useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";

import { Fade } from "react-awesome-reveal";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";
import PageTitleComponent from "../UI/PageTitle/PageTitleComponent";

import "./CounterComponent.scss";

const CounterComponent = ({ counters }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const targetRef = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
    targetRef;
  }, [targetRef, lang]);

  return (
    <section className="counterSection">
      <Container className="counterContainer">
        <Row>
          {/* Counter page */}
          <PageTitleComponent identifier={"counter_page"} />

          {/* Counters */}
          {counters.map((counter, index) => (
            <Col
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="counterColumn text-center"
              key={index}
            >
              <Fade
                cascade
                damping={0.1}
                delay={index * 110}
                direction="down"
                className=""
              >
                <i className={`${counter.icon} countingIcon`}></i>
                <CountUp
                  target={targetRef}
                  start={0}
                  end={counter.number}
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
                <h5 className="counterTitle">{counter.title}</h5>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CounterComponent;
