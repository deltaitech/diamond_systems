import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";

import { Col, Container, Row } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "./FeaturesComponent.scss";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturesComponent = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  const { features } = useSelector((state) => state.home);
  return (
    <>
      <Container className="featureContainer">
        <Row className="featureRow">
          <Swiper
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            loop={true}
            navigation={false}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={50}
            dir={
              LanguageDirection(lang ?? defaultLang) === "rtl" ? "rtl" : "ltr"
            }
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="featureSwiper"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="featureDetails text-center">
                  <i className={`${feature.icon} featureIcon`}></i>
                  <h5 className="featureTitle">{feature.title}</h5>
                  <div
                    className="featureDescription text-limit"
                    style={{ "--lines": 2 }}
                    dangerouslySetInnerHTML={{ __html: feature.description }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default FeaturesComponent;
