import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import {
  Counter,
  Fullscreen,
  Slideshow,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const LightboxComponent = ({ slides, slide, title, lightbox, setLightbox }) => {
  // Refs
  const thumbnailsRef = useRef(null);
  const slideshowRef = useRef(null);
  const fullscreenRef = useRef(null);
  const zoomRef = useRef(null);
  // i18next
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Lightbox
        plugins={[Thumbnails, Counter, Slideshow, Fullscreen, Zoom]}
        open={lightbox.isOpen}
        close={() =>
          setLightbox({
            isOpen: !lightbox.isOpen,
            index: 0,
          })
        }
        slides={
          slides
            ? slides.map((slide, index) => ({
                type: "image",
                src: slide.image,
                alt: `image #${index}`,
                imageFit: "contain",
              }))
            : [{
                type: "image",
                src: slide,
                alt: `image`,
                imageFit: "contain",
              }]
        }
        counter={{
          style: {
            left: lang === "en" ? 0 : "unset",
            right: lang === "en" ? "unset" : 0,
            bottom: 0,
            top: "unset",
          },
        }}
        thumbnails={{
          ref: thumbnailsRef,
          showToggle: true,
          imageFit: "cover",
        }}
        slideshow={{
          ref: slideshowRef,
          autoplay: false,
          delay: 2000,
        }}
        fullscreen={{ ref: fullscreenRef }}
        zoom={{ ref: zoomRef, scrollToZoom: true }}
        on={{
          click: () => {
            // Thumbnail
            (thumbnailsRef.current?.visible
              ? thumbnailsRef.current?.hide
              : thumbnailsRef.current?.show)?.();

            // Slideshow
            (slideshowRef.current?.playing
              ? slideshowRef.current?.pause
              : slideshowRef.current?.play)?.();

            // Fullscreen
            fullscreenRef.current?.enter();

            // Zoom
            zoomRef.current?.zoomIn();
          },
        }}
      />
    </>
  );
};

export default LightboxComponent;
