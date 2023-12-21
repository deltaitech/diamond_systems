import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";

import AboutComponent from "../../components/About/AboutComponent";
import MainSliderComponent from "../../components/MainSlider/MainSliderComponent";
import CounterComponent from "../../components/Counter/CounterComponent";
import SliderComponent from "../../components/Slider/SliderComponent";
import ItemsComponent from "../../components/Items/ItemsComponent";

import "./HomePage.scss";
import FeaturesComponent from "../../components/Features/FeaturesComponent";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  //Redux
  const { sliders, pages, clients, counters } = useSelector(
    (state) => state.home
  );
  const { services } = useSelector((state) => state.services);
  const { data } = useSelector((state) => state.settings);
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
      <HelmetComponent
        title={`${data.settings.website_title}`}
      />
      <section dir={LanguageDirection(lang ?? defaultLang)}>
        {/* Slider */}
        <MainSliderComponent
          sliders={sliders}
          socials={data.contacts.social}
          className="mb-5"
        />

        <div className="SliderFeature">
          {/* Features */}
          <FeaturesComponent />
        </div>

        {/* Services */}
        <ItemsComponent
          items={services}
          name={"services"}
          hasShowMore={true}
          hasSectionTitle={true}
          sectionTitle={t("words:our_services")}
        />

        {/* Counters */}
        <CounterComponent counterPage={counterPage} counters={counters} />

        {/* Clients */}
        <SliderComponent data={clients} numbers={4} space={50} />
      </section>
    </>
  );
};

export default HomePage;
