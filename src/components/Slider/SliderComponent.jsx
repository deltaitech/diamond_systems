import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";

import { Container, Image, Row } from "react-bootstrap";
import LightboxComponent from "./../UI/LightBox/LightboxComponent";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Zoom } from "react-awesome-reveal";

// import "swiper/css";
import "./SliderComponent.scss";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderComponent = ({ data, numbers, space }) => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  // States
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <section id="generalSliderSection">
      <Container>
        <Zoom cascade>
          <Row>
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              navigation={false}
              pagination={{
                dynamicBullets: true,
              }}
              // grabCursor={true}
              slidesPerView={1}
              spaceBetween={space}
              dir={
                LanguageDirection(lang ?? defaultLang) === "rtl" ? "rtl" : "ltr"
              }
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: numbers,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: numbers,
                  spaceBetween: space,
                },
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="generalSliderSectionSwiper"
            >
              {data.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    key={image.id}
                    src={image.image}
                    alt={"Image"}
                    className="clientImage"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    onClick={() => setLightbox({ isOpen: true })}
                  />
                </SwiperSlide>
              ))}
              <LightboxComponent
                lightbox={lightbox}
                setLightbox={setLightbox}
                slides={data}
              />
            </Swiper>
          </Row>
        </Zoom>
      </Container>
    </section>
  );
};

export default SliderComponent;
