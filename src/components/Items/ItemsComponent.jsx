import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import { defaultLang, isMultiLang } from "../../utils/Helpers/General";
import CustomButton from "../UI/CustomButton/CustomButton";
import { Fade, Zoom } from "react-awesome-reveal";

import "./ItemsComponent.scss";

const ItemsComponent = ({
  items,
  hasTitle = false,
  hasDescription = false,
  title,
  description,
  name,
  hasShowMore = false,
  hasSinglePage = false,
  hasSectionTitle = false,
  sectionTitle,
}) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  //States
  const [count, setCount] = useState(6);

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <section className="itemSection">
      <Container>
        {hasSectionTitle && (
          <Row>
            <Col>
              <Zoom cascade delay={100}>
                <h1 className="sectionTitle">{sectionTitle}</h1>
              </Zoom>
            </Col>
          </Row>
        )}
        {hasTitle && (
          <Row>
            <Col>
              <Zoom cascade delay={100}>
                <h1 className="sectionTitle">{title}</h1>
              </Zoom>

              {hasDescription && (
                <Zoom cascade delay={80}>
                  <div
                    className="sectionDescription"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                </Zoom>
              )}
            </Col>
          </Row>
        )}

        <Row xs={1} sm={1} md={3} lg={3} className="g-4 itemRow">
          {items.slice(0, count).map((item, index) => (
            <Fade
              cascade
              damping={0.1}
              delay={index * 110}
              direction="down"
              key={index}
            >
              <Col className="itemColumn">
                <Card className="itemCard">
                  <div className="imageContainer">
                    <Card.Img
                      variant="top"
                      className="itemCardImage"
                      src={
                        item.hasOwnProperty("cover") ? item.cover : item.image
                      }
                    />
                  </div>

                  <Card.Body className="itemCardBody">
                    <Card.Title
                      className="itemCardBodyTitle text-limit"
                      style={{
                        "--lines": 2,
                      }}
                    >
                      {hasSinglePage ? (
                        <Link
                          to={isMultiLang ? `/${lang}/${name}/${item.id}` : `/${name}/${item.id}`}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Fade>
          ))}
        </Row>

        <Fade cascade={true} damping={1} delay={300}>
          {hasShowMore ? (
            <Row className="showMore">
              <CustomButton
                link={isMultiLang ? `/${lang}/${name}` : `/${name}`}
                linkTitle={t("words:show_more")}
                className={"showMoreBtn"}
              />
            </Row>
          ) : (
            <Row
              style={{
                display: count >= items.length ? `none` : `block`,
              }}
            >
              <Col md={12} className="d-flex justify-content-center showMore">
                <CustomButton
                  onclick={() => {
                    setCount(+count + 6);
                    setTimeout(() => {
                      window.scrollBy({
                        behavior: "smooth",
                        top: window.innerHeight / 2.5,
                        left: 0,
                      });
                    }, 0);
                  }}
                  linkTitle={t("words:show_more")}
                  hasLink={false}
                  className={"showMoreBtn"}
                />
              </Col>
            </Row>
          )}
        </Fade>
      </Container>
    </section>
  );
};

export default ItemsComponent;
