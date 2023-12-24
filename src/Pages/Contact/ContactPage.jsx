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
import { useGetSettingsQuery } from "../../slices/settings-slice";

import { Fade, Slide, Zoom } from "react-awesome-reveal";

import "./ContactPage.scss";

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

  // RTK Query
  const { data, isLoading, isError } = useGetSettingsQuery();

  return (
    <>
      {/* Page title */}
      <HelmetComponent
        title={`${data.data.settings.website_title} | ${t(
          "words:navbar.contact"
        )}`}
      />
      <BreadcrumbComponent current={t("words:navbar.contact")} />
      <section
        className="contactPage"
        dir={LanguageDirection(lang ?? defaultLang)}
      >
        <Container className="mt-5 contactPageContainer">
          {isLoading || isError ? (
            <CustomSpinner />
          ) : (
            <>
              <Row className="mb-5 g-5">
                 {/* Contact Information */}
                 <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="contactInfo h-100">
                    {/* Logo */}
                    <Slide direction="down" style={{ width: "100%" }}>
                      <Logo
                        alt={"Logo"}
                        src={data.data.settings.logo}
                        className="logo"
                      />
                    </Slide>

                    {/* Address */}
                    <div className="contactDetails">
                      <Slide
                        damping={0.1}
                        direction="down"
                        cascade
                        className="w-100"
                      >
                        <label className="contactLabel">
                          <i className="fa-solid fa-location-pin"></i>
                          {t("words:address")}:
                        </label>
                        <span>{data.data.settings.address}</span>
                      </Slide>
                    </div>

                    {/* Mobile */}
                    <div className="contactDetails">
                      {data.data.contacts.mobile.map((phone, index) => (
                        <Slide
                          damping={0.1}
                          direction={
                            LanguageDirection(lang ?? defaultLang) === "rtl"
                              ? "left"
                              : "right"
                          }
                          cascade
                          className="w-100"
                          key={index}
                        >
                          <div>
                            <label className="contactLabel">
                              <i className={phone.icon}></i>
                              {t("words:phone")}:
                            </label>
                            <label className="contact">
                              <Link to={`tel:${phone.contact}`}>
                                {phone.contact}
                              </Link>
                            </label>
                          </div>
                        </Slide>
                      ))}
                    </div>

                    {/* Email */}
                    <div className="contactDetails">
                      {data.data.contacts.email.map((mail, index) => (
                        <Slide
                          damping={0.1}
                          direction={
                            LanguageDirection(lang ?? defaultLang) === "rtl"
                              ? "right"
                              : "left"
                          }
                          cascade
                          className="w-100"
                          key={index}
                        >
                          <div>
                            <label className="contactLabel">
                              <i className={mail.icon}></i>
                              {t("words:email")}:
                            </label>
                            <label className="contact">
                              <Link to={`mailto:${mail.contact}`}>
                                {mail.contact}
                              </Link>
                            </label>
                          </div>
                        </Slide>
                      ))}
                    </div>

                    {/* Social Media */}
                    <div className="social">
                      <Fade cascade>
                        <ul className="list-group list-group-horizontal">
                          {data.data.contacts.social.map((so, index) => (
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
                      </Fade>
                    </div>
                  </div>
                </Col>

                {/* Contact Form */}
                <ContactForm />
              </Row>
            </>
          )}
        </Container>

        <Container className="contactDetailsContainer">
          {isLoading || isError ? (
            <CustomSpinner />
          ) : (
            <>
              <Row className="g-5"></Row>
            </>
          )}
        </Container>

        <Container>
          <Row>
            <Zoom className="w-100">
              <div
                dangerouslySetInnerHTML={{
                  __html: fixGoogleMaps(data.data.settings.map),
                }}
                className="map w-100"
              ></div>
            </Zoom>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
