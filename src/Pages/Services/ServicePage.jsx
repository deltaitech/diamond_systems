import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useGetAllServicesQuery } from "../../slices/services-slice";
import { useGetSettingsQuery } from "../../slices/settings-slice";

import { Col, Container, Row } from "react-bootstrap";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";
import BreadcrumbComponent from "../../components/UI/Breadcrumb/BreadcrumbComponent";
import CustomSpinner from "../../utils/Spinner/CustomSpinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../utils/Helpers/General";
import PlaceholderImage from "../../assets/favicon.png";
import LightboxComponent from "../../components/UI/LightBox/LightboxComponent";
import { Slide } from "react-awesome-reveal";

import "./ServicePage.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

const ServicePage = () => {
  const { t, i18n } = useTranslation();
  const { lang, id } = useParams();

  //RTQ Query
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery(lang);
  const { data: settingsData } = useGetSettingsQuery(lang);

  // Destructure data from servicesData
  const { services } = servicesData.data;
  const service = services?.find(
    (service) => parseInt(service.id) === parseInt(id)
  );

  // States
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

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
  return (
    <>
      {/* Page title */}
      <HelmetComponent
        title={`${settingsData.data.settings.website_title} | ${service?.title}`}
      />
      <BreadcrumbComponent
        title1={t("words:navbar.services")}
        link1={isMultiLang ? `/${lang}/services` : `/services`}
        current={service?.title}
      />
      <section className="SingleServiceSection">
        <Container dir={LanguageDirection(lang ?? defaultLang)} className="">
          {isLoading || isError ? (
            <CustomSpinner />
          ) : (
            <Row className="g-4">
              <Col xs={12} sm={12} md={12}>
                <Row className="g-4 overflow-hidden">
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <Slide
                      cascade
                      direction={
                        LanguageDirection(lang ?? defaultLang) === "rtl"
                          ? "right"
                          : "left"
                      }
                    >
                      <div
                        className="serviceImage"
                        onClick={() =>
                          setLightbox({ isOpen: true, index: 0 })
                        }
                      >
                        <LazyLoadImage
                          alt={service?.title}
                          src={service?.image}
                          placeholderSrc={PlaceholderImage}
                          effect="blur"
                          className="img-responsive"
                        />
                      </div>
                    </Slide>
                  </Col>

                  <Col xs={12} sm={12} md={6} lg={6}>
                    <Slide
                      cascade
                      damping={0.1}
                      duration={service?.id * 70}
                      direction={
                        LanguageDirection(lang ?? defaultLang) === "rtl"
                          ? "left"
                          : "right"
                      }
                    >
                      <h1 className="serviceTitle">{service?.title}</h1>
                      <div
                        className="serviceDescription"
                        dangerouslySetInnerHTML={{
                          __html: service?.description,
                        }}
                      ></div>
                    </Slide>
                  </Col>
                </Row>
              </Col>

              <LightboxComponent
                lightbox={lightbox}
                setLightbox={setLightbox}
                slides={[service]}
                pathname="<object>.image"
              />
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default ServicePage;
