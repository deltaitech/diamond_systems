import React, { useEffect } from "react";
import { Image } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import { Link, useParams } from "react-router-dom";
import {
  FormatNumber,
  defaultLang,
  isMultiLang,
} from "../../utils/Helpers/General";
import { useTranslation } from "react-i18next";
import FeaturesComponent from "./../Features/FeaturesComponent";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./MainSliderComponent.scss";

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
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          loop={true}
          effect={"fade"}
          pagination={false}
          modules={[Autoplay, EffectFade, Pagination]}
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
              <div className="sliderSocialContainer">
                {socials.map((social, index) => (
                  <div className="sliderSocial" key={index}>
                    <Link target="_blank" to={social.contact}>
                      <i className={social.icon}></i>
                    </Link>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default MainSliderComponent;
