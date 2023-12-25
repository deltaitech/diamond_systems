import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";

import { Col, Container, Row } from "react-bootstrap";
import LightboxComponent from "./../UI/LightBox/LightboxComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceholderImage from "../../assets/favicon.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Zoom } from "react-awesome-reveal";

// import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./SliderComponent.scss";

const SliderComponent = ({
  data,
  numbers,
  space,
  hasTitle = false,
  title,
  hasDescription = false,
}) => {
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
                  <div className="sliderImage">
                    <LazyLoadImage
                      key={image.id}
                      src={image.image}
                      alt={"Image"}
                      className="clientImage"
                      placeholderSrc={PlaceholderImage}
                      effect="blur"
                      onClick={() =>
                        setLightbox({ isOpen: true, index: index })
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
              <LightboxComponent
                lightbox={lightbox}
                setLightbox={setLightbox}
                slides={data}
                pathname="<object>.image"
              />
            </Swiper>
          </Row>
        </Zoom>
      </Container>
    </section>
  );
};

export default SliderComponent;
