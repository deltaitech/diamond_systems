import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Col, Container, Image, Row } from "react-bootstrap";
import { LanguageDirection, defaultLang, isMultiLang } from "../Helpers/General";
import Logo from "../../assets/logo.png";
import CustomButton from "../../components/UI/CustomButton/CustomButton";

import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <section dir={LanguageDirection(lang ?? defaultLang)}>
      <Container className="not_found_page">
        <Row>
          <Col xs={12} sm={12} md={12} className="mt-3">
            <h1 className="display-1">{t("words:errors.codes.404")}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} className="mt-3">
            <Image
              src={Logo}
              className="notFoundImage"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = new URL(
                  "./../../assets/logo.png",
                  import.meta.url
                ).href;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} className="mt-3 d-flex notFoundData">
            <h3 className="mb-4 notFoundText">{t("words:errors.404")}</h3>
            <CustomButton
                link={isMultiLang ? `/${lang}/` : `/`}
                linkTitle={t(`${t("words:errors.back_home")}`)}
                className={'backBtn'}
              />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotFoundPage;
