import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";

import { useGetSettingsQuery } from "../../slices/settings-slice";
import { useGetHomeDataQuery } from "../../slices/home-slice";
import { useGetAllServicesQuery } from "../../slices/services-slice";

import MainSliderComponent from "../../components/MainSlider/MainSliderComponent";
import CounterComponent from "../../components/Counter/CounterComponent";
import SliderComponent from "../../components/Slider/SliderComponent";
import FeaturesComponent from "../../components/Features/FeaturesComponent";
import SeparatorComponent from "../../components/Separator/SeparatorComponent";
import ItemsComponent from "../../components/Items/ItemsComponent";

import "./HomePage.scss";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  // RTK Query
  const { data: settingsData } = useGetSettingsQuery();

  const { data: homeData } = useGetHomeDataQuery();

  const { data: servicesData } = useGetAllServicesQuery();

  // Destructure data from homeData
  const { sliders, pages, clients, counters } = homeData.data;

  // Destructure data from servicesData
  const { services } = servicesData.data;

  const home_first_separator = pages.find(
    (page) => page.identifier === "first_separator"
  );

  const home_second_separator = pages.find(
    (page) => page.identifier === "second_separator"
  );

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
      <HelmetComponent title={`${settingsData.data.settings.website_title}`} />
      <section dir={LanguageDirection(lang ?? defaultLang)}>
        {/* Slider */}
        <MainSliderComponent
          sliders={sliders}
          socials={settingsData.data.contacts.social}
          className="mb-5"
        />

        {/* Features */}
        <FeaturesComponent />

        {/* First Separator */}
        <SeparatorComponent
          data={home_first_separator}
          link="contact"
          direction={
            LanguageDirection(lang ?? defaultLang) === "rtl"
              ? "to right"
              : "to left"
          }
          bgFirstColor="rgba(var(--primaryColor), 0.4)20%"
          bgSecondColor="rgba(var(--primaryColor), 0.5) 60%"
          hasLink={true}
        />

        {/* Counters */}
        <CounterComponent counters={counters} />

        {/* Second Separator */}
        <SeparatorComponent
          data={home_second_separator}
          direction={
            LanguageDirection(lang ?? defaultLang) === "rtl"
              ? "to left"
              : "to right"
          }
          bgFirstColor="rgba(var(--primaryColor), 0.4)20%"
          bgSecondColor="rgba(var(--primaryColor), 0.5) 60%"
          hasLink={false}
        />

        {/* Services */}
        <ItemsComponent
          items={services}
          name={"services"}
          hasShowMore={true}
          hasSectionTitle={true}
          sectionTitle={t("words:our_services")}
          hasSinglePage={true}
        />

        {/* Clients */}
        <SliderComponent data={clients} numbers={4} space={50} />
      </section>
    </>
  );
};

export default HomePage;
