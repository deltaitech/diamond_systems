import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Link, useParams, NavLink } from "react-router-dom";
import {
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../../utils/Helpers/General";
import { useSelector } from "react-redux";
import { useGetSettingsQuery } from "../../../slices/settings-slice";

import { Col, Container, Image, Row } from "react-bootstrap";

import "./FooterComponent.scss";

const FooterComponent = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  // RTK Query
  const { data } = useGetSettingsQuery();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <section
      className="footerSection"
      dir={LanguageDirection(lang ?? defaultLang)}
      style={{ "--footerImage": `url(${data.data.settings.footer_img})` }}
    >
      {/* Footer */}
      <Container className="footerContainer">
        <Row className="">
          {/* Logo Col */}
          <Col lg={4} md={4} sm={12} xs={12} className="logoSection">
            <Image
              src={data.data.settings.white_logo}
              className="footerLogo"
              alt={t("words:site_title")}
            />
            <div
              className="footerDescription"
              dangerouslySetInnerHTML={{
                __html: data.data.settings.footer_description,
              }}
            ></div>
          </Col>

          {/* Links Col */}
          <Col lg={4} md={4} sm={12} xs={12} className="linksSection">
            <h4 className="FooterMainTitle">{t("words:footer.links")}</h4>

            <ul className="footerLinks">
              <li>
                <NavLink
                  to={isMultiLang ? `/${lang}` : `/`}
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("words:navbar.home")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={isMultiLang ? `/${lang}/about` : `/about`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("words:navbar.about")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={isMultiLang ? `/${lang}/services` : `/services`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("words:navbar.services")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={isMultiLang ? `/${lang}/contact` : `/contact`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("words:navbar.contact")}
                </NavLink>
              </li>
            </ul>
          </Col>

          {/* Contact Col */}
          <Col lg={4} md={4} sm={12} xs={12}>
            <h4 className="FooterMainTitle">{t("words:navbar.contact")}</h4>

            <ul className="footerContact">
              <li>
                <label className="contactLabel">
                  <i className="fa-solid fa-location-pin"></i>
                  {t("words:address")}:
                </label>
                <span>{data.data.settings.address}</span>
              </li>

              <li>
                {data.data.contacts.mobile.map((phone, index) => (
                  <div key={index}>
                    <label className="contactLabel">
                      <i className={phone.icon}></i>
                      {t("words:phone")}:
                    </label>
                    <label className="contact">
                      <Link to={`tel:${phone.contact}`}>{phone.contact}</Link>
                    </label>
                  </div>
                ))}
              </li>

              <li>
                {data.data.contacts.email.map((mail, index) => (
                  <div key={index}>
                    <label className="contactLabel">
                      <i className={mail.icon}></i>
                      {t("words:email")}:
                    </label>
                    <label className="contact">
                      <Link to={`mailto:${mail.contact}`}>{mail.contact}</Link>
                    </label>
                  </div>
                ))}
              </li>

              <li>
                <ul className="list-group list-group-horizontal">
                  {data.data.contacts.social.map((so, index) => (
                    <li className="list-group-item socialIcon" key={index}>
                      <Link to={`${so.contact}`} target="_blank">
                        <i className={`${so.icon}`}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
        {/* Company copyrights */}
        <Row>
          <Col className="copyrights">{data.data.settings.copyrights}</Col>
        </Row>
      </Container>

      {/* Marwan copyrights */}
      <div className="marwan">
        <p>
          {t("words:copyrights.developed")}
          <Link to="https://marwan.tech/ar/service-request" target="_blank">
            {t("words:copyrights.company")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FooterComponent;
