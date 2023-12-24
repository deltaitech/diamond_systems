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

import BreadcrumbComponent from "../../components/UI/Breadcrumb/BreadcrumbComponent";
import SliderComponent from "../../components/Slider/SliderComponent";
import PlaceholderImage from "../../assets/logo.png";
import { useGetSettingsQuery } from "../../slices/settings-slice";
import { useGetHomeDataQuery } from "../../slices/home-slice";

import { Slide } from "react-awesome-reveal";

import "./AboutPage.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import AboutCardComponent from "../../components/About/AboutCardComponent";
import LightboxComponent from "../../components/UI/LightBox/LightboxComponent";

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

  // RTK Query
  const { data: settingsData } = useGetSettingsQuery();

  const {
    data: homeData,
    isLoading: homeLoading,
    isError: homeError,
  } = useGetHomeDataQuery();
  // Destructure data from homeData
  const { pages, clients } = homeData.data;

  const about = pages.find((page) => page.identifier === "about");
  const our_vision = pages.find((page) => page.identifier === "our_vision");
  const our_mission = pages.find((page) => page.identifier === "our_mission");

  // States
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  return (
    <>
      {/* Page title */}
      <HelmetComponent
        title={`${settingsData.data.settings.website_title} | ${t(
          "words:navbar.about"
        )}`}
      />

      <BreadcrumbComponent current={t("words:navbar.about")} />
      {homeLoading || homeError ? (
        <CustomSpinner />
      ) : (
        <section
          className="pageSection"
          dir={LanguageDirection(lang ?? defaultLang)}
        >
          {/* About */}
          <div className="aboutPage">
            <AboutCardComponent
              item={about}
              setLightbox={setLightbox}
              index={1}
            />
          </div>

          {/* Our Vision */}
          <div className="aboutPage">
            <AboutCardComponent
              item={our_vision}
              setLightbox={setLightbox}
              index={2}
            />
          </div>

          {/* Our Mission */}
          <div className="aboutPage">
            <AboutCardComponent
              item={our_mission}
              setLightbox={setLightbox}
              index={3}
            />
          </div>

          {/* Clients */}
          <SliderComponent
            data={clients}
            numbers={4}
            space={50}
            setLightbox={setLightbox}
          />

          <LightboxComponent
            lightbox={lightbox}
            setLightbox={setLightbox}
            slides={[about, our_mission, our_vision]}
          />
        </section>
      )}
    </>
  );
};

export default AboutPage;
