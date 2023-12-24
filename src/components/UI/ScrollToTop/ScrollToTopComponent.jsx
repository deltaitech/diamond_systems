import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { LanguageDirection, defaultLang } from "../../../utils/Helpers/General";

import "./ScrollToTopComponent.scss";

const ScrollToTopComponent = () => {
  const [show, setShow] = useState(false);

  const { lang } = useParams();

  window.addEventListener("scroll", () => {
    // console.log(window.innerHeight);
    if (window.scrollY > window.innerHeight) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    show && (
      <div
        dir={LanguageDirection(lang ?? defaultLang)}
        className="scroll-container animate__animated animate__bounce animate__duration_5s animate__delay-5s animate__slower animate__infinite"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      ></div>
    )
  );
};

export default ScrollToTopComponent;
