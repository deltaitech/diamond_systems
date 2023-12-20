import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import {
  LanguageDirection,
  defaultLang,
  fixGoogleMaps,
} from "../../utils/Helpers/General";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";
import BreadcrumbComponent from "../../components/UI/Breadcrumb/BreadcrumbComponent";
import ContactForm from "../../components/ContactForm/ContactForm";
import Logo from "../../components/UI/Logo";

import "./ContactPage.scss";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

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

  const { isSettingsDataLoading, data } = useSelector(
    (state) => state.settings
  );

  return (
    <>
      {/* Page title */}
      <HelmetComponent
        title={`${data.settings.website_title} | ${t("words:navbar.contact")}`}
      />
      <BreadcrumbComponent current={t("words:navbar.contact")} />
      <section
        className="contactPage"
        dir={LanguageDirection(lang ?? defaultLang)}
      >
        <Container className="mt-5 contactPageContainer">
          {isSettingsDataLoading !== "fulfilled" ? (
            <CustomSpinner />
          ) : (
            <>
              <Row className="mb-5 g-5">
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="contactInfo h-100">
                    {/* Logo */}
                    <Zoom>
                      <Logo
                        alt={"Logo"}
                        src={data.settings.logo}
                        className="logo"
                      />
                    </Zoom>

                    <Zoom className="w-100">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: fixGoogleMaps(data.settings.map),
                        }}
                        className="map w-100"
                      ></div>
                    </Zoom>
                  </div>
                </Col>

                {/* Contact Form */}
                <ContactForm />
              </Row>
            </>
          )}
        </Container>

        <Container className="contactDetailsContainer">
          {isSettingsDataLoading !== "fulfilled" ? (
            <CustomSpinner />
          ) : (
            <>
              <Row className="g-5">
                {/* Mobile */}
                <Col className="contactDetailsColumn text-center">
                  {data.contacts.mobile.map((phone, index) => (
                    <Slide
                      damping={0.1}
                      direction="down"
                      cascade
                      className="w-100"
                      key={index}
                    >
                      <div>
                        <p className="icon">
                          <i className={`${phone.icon}`}></i>
                        </p>

                        <label className="contact">
                          <Link to={`tel:${phone.contact}`}>
                            {phone.contact}
                          </Link>
                        </label>
                      </div>
                    </Slide>
                  ))}
                </Col>

                {/* Address */}
                <Col className="contactDetailsColumn text-center">
                  <Slide damping={0.1} direction="up" cascade className="w-100">
                    <div>
                      <p className="icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </p>
                      <label className="contact">
                        <Link to={`#`}>{data.settings.address}</Link>
                      </label>
                    </div>
                  </Slide>
                </Col>

                {/* Email */}
                <Col className="contactDetailsColumn text-center">
                  {data.contacts.email.map((email, index) => (
                    <Slide
                      damping={0.1}
                      direction="down"
                      cascade
                      className="w-100"
                      key={index}
                    >
                      <div>
                        <p className="icon">
                          <i className={`${email.icon}`}></i>
                        </p>
                        <label className="contact">
                          <Link to={`mailto:${email.contact}`}>
                            {email.contact}
                          </Link>
                        </label>
                      </div>
                    </Slide>
                  ))}
                </Col>

                {/* Social media */}
                <Col className="contactDetailsColumn text-center">
                  <div className="social">
                    <Slide
                      damping={0.1}
                      direction="down"
                      cascade
                      className="w-100"
                    >
                      <ul className="list-group list-group-horizontal">
                        {data.contacts.social.map((so, index) => (
                          <Link
                            to={`${so.contact}`}
                            target="_blank"
                            key={index}
                          >
                            <li className="list-group-item socialIcon">
                              <i className={`${so.icon}`}></i>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </Slide>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
