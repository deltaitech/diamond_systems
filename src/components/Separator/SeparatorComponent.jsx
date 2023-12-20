import React, { useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../UI/CustomButton/CustomButton";
import { defaultLang, isMultiLang } from "../../utils/Helpers/General";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import "./SeparatorComponent.scss";

const SeparatorComponent = ({
  data,
  link,
  direction,
  bgFirstColor,
  bgSecondColor,
  hasLink = true,
}) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <section
      className="separatorSection"
      style={{
        background: `linear-gradient(${direction},
            ${bgFirstColor},
            ${bgSecondColor},
            transparent), url(${data.image})`,
      }}
    >
      <Container>
        <Row>
          <Col className="separatorDetails">
            <Fade cascade damping={0.1} delay={80}>
              <h6 className="separatorSubTitle">{data.sub_title}</h6>
              <div
                className="separatorTitle"
                dangerouslySetInnerHTML={{ __html: data.title }}
              ></div>
              {hasLink && (
                <CustomButton
                  link={isMultiLang ? `/${lang}/${link}` : `/${link}`}
                  linkTitle={t(`words:navbar.${link}`)}
                />
              )}
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeparatorComponent;
