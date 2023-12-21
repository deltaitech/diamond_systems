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
import ItemsComponent from "../../components/Items/ItemsComponent";
import FeaturesComponent from "../../components/Features/FeaturesComponent";

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

  const counterPage = pages.find((page) => page.identifier === "counter_page");

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

        <FeaturesComponent />

        {/* Services */}
        {/* <ItemsComponent
          items={services}
          name={"services"}
          hasShowMore={true}
          hasSectionTitle={true}
          sectionTitle={t("words:our_services")}
        /> */}

        {/* Counters */}
        <CounterComponent counterPage={counterPage} counters={counters} />

        {/* Clients */}
        <SliderComponent data={clients} numbers={4} space={50} />
      </section>
    </>
  );
};

export default HomePage;
