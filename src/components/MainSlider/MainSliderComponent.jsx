import React, { useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";

import { Link, useParams } from "react-router-dom";
import {
  FormatNumber,
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../utils/Helpers/General";
import { useTranslation } from "react-i18next";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./MainSliderComponent.scss";
import CustomButton from "../UI/CustomButton/CustomButton";

const MainSliderComponent = ({ sliders, socials }) => {
  // main
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '">' +
        FormatNumber(0, lang ?? defaultLang) +
        FormatNumber(index + 1, lang ?? defaultLang) +
        "</span>"
      );
    },
  };

  return (
    sliders.length > 0 && (
      <div className="mainSlider">
        <Swiper
          direction="horizontal"
          spaceBetween={0}
          navigation={true}
          centeredSlides={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: true,
          // }}
          loop={true}
          effect={"fade"}
          pagination={false}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="mySwiper"
        >
          {sliders.map((slider, index) => (
            <SwiperSlide key={index}>
              {
                <Image
                  fluid
                  key={slider.id}
                  src={slider.image}
                  alt="Slider Image"
                  className="text-capitalize w-100 h-100"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              }
              <div className="SliderData">
                <Container
                  dir={
                    LanguageDirection(lang ?? defaultLang) === "rtl"
                      ? "yes"
                      : "no"
                  }
                >
                  <Row className="SliderDataRow">
                    <h1 className="sliderData-title">{slider.title}</h1>
                    <div
                      className="sliderData-description"
                      dangerouslySetInnerHTML={{ __html: slider.description }}
                    ></div>
                    <CustomButton
                      link={isMultiLang ? `/${lang}/services` : `/services`}
                      linkTitle={t("show_more")}
                      className={"sliderData-btn"}
                    />
                  </Row>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default MainSliderComponent;
