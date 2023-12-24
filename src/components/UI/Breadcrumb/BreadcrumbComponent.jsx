import React, { useEffect } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LanguageDirection, defaultLang } from "../../../utils/Helpers/General";

import { useGetSettingsQuery } from "../../../slices/settings-slice";

import "./Breadcrumb.scss";

const BreadcrumbComponent = ({ link1, title1, link2, title2, current }) => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  //RTQ Query
  const { data: settingsData } = useGetSettingsQuery();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <div
      className="custom_breadcrumb"
      style={{ "--breadcrumb-img": `url(${settingsData?.data.settings.breadcrumb})` }}
    >
      <Container dir={LanguageDirection(lang ?? defaultLang)}>
        <div className="breadcrumb_main_title">
          <h2>{current}</h2>
        </div>
        <Breadcrumb className="d-flex justify-content-start align-items-start">
          <Breadcrumb.Item linkAs={"span"}>
            <Link to={`/${lang}`}>{t("words:navbar.home")}</Link>
          </Breadcrumb.Item>

          {title1 ? (
            <Breadcrumb.Item linkAs={"span"}>
              <Link to={`${link1}`}>{title1}</Link>
            </Breadcrumb.Item>
          ) : (
            ""
          )}

          {title2 ? (
            <Breadcrumb.Item linkAs={"span"}>
              <Link to={`${link2}`}>{title2}</Link>
            </Breadcrumb.Item>
          ) : (
            ""
          )}

          <Breadcrumb.Item active>{current}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </div>
  );
};

export default BreadcrumbComponent;
