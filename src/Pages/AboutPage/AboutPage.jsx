import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import {
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../utils/Helpers/General";
import { Col, Container, Image, Row } from "react-bootstrap";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";

import { useSelector } from "react-redux";
import BreadcrumbComponent from "../../components/UI/Breadcrumb/BreadcrumbComponent";
import SliderComponent from "../../components/Slider/SliderComponent";
import PlaceholderImage from "../../assets/logo.png";

import { Slide } from "react-awesome-reveal";
import AboutComponent from "../../components/About/AboutComponent";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AboutPage.scss";

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [lang]);

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  // Redux
  const { isHomeDataLoading, pages, certificates, clients } = useSelector(
    (state) => state.home
  );
  const { data } = useSelector((state) => state.settings);
  const homeAbout = pages.find((page) => page.identifier === "home_about");
  const our_vision = pages.find((page) => page.identifier === "vision");
  const our_aim = pages.find((page) => page.identifier === "aim");

  const aboutLocation = location.pathname.includes("about") ? true : false;

  return (
    <>
      {/* Page title */}
      <HelmetComponent
        title={`${data.settings.website_title} | ${t("words:navbar.about")}`}
      />

      <BreadcrumbComponent current={t("words:navbar.about")} />
      {isHomeDataLoading !== "fulfilled" ? (
        <CustomSpinner />
      ) : (
        <section
          className="pageSection"
          dir={LanguageDirection(lang ?? defaultLang)}
          // style={{ paddingBlockEnd: aboutLocation ? "4rem" : "9.5rem" }}
        >
          {/* Home About Page */}
          <AboutComponent about={homeAbout} />

          <Container id="aboutPage">
            {/* Our Vision */}
            <Row className="aboutRow">
              <Col lg={6} md={6} sm={12} xs={12} className="overflow-hidden">
                <Slide
                  cascade
                  direction={
                    LanguageDirection(lang ?? defaultLang) === "rtl"
                      ? "right"
                      : "left"
                  }
                  damping={0.1}
                  delay={90}
                  className="h-100"
                >
                  <Image
                    src={our_vision.image}
                    alt={our_vision.title}
                    className="aboutImage"
                  />
                </Slide>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12} className="aboutDetails">
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
                  <h1 className="aboutTitle">{our_vision.title}</h1>
                  <div
                    className="aboutDescription"
                    dangerouslySetInnerHTML={{
                      __html: our_vision?.description,
                    }}
                  ></div>
                </Slide>
              </Col>
            </Row>

            {/* Our Aim */}
            <Row className="aboutRow">
              <Col lg={6} md={6} sm={12} xs={12} className="aboutDetails">
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
                  <h1 className="aboutTitle">{our_aim.title}</h1>
                  <div
                    className="aboutDescription"
                    dangerouslySetInnerHTML={{
                      __html: our_aim?.description,
                    }}
                  ></div>
                </Slide>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="overflow-hidden">
                <Slide
                  cascade
                  direction={
                    LanguageDirection(lang ?? defaultLang) === "rtl"
                      ? "right"
                      : "left"
                  }
                  damping={0.1}
                  delay={90}
                  className="h-100"
                >
                  <Image
                    src={our_aim.image}
                    alt={our_aim.title}
                    className="aboutImage"
                  />
                </Slide>
              </Col>
            </Row>
          </Container>

          {/* Certificates */}
          <SliderComponent data={certificates} numbers={3} space={20} />

          {/* Clients */}
          <SliderComponent data={clients} numbers={4} space={50} />
        </section>
      )}
    </>
  );
};

export default AboutPage;
