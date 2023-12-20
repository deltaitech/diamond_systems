import React from "react";
import { Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./preloader.scss";

const PreLoader = () => {
  return (
    <>
      <div className="preloader">
        {/* <Image
          src={logo}
          alt="Cherry Wood Logo"
          className="image animate__animated animate__heartBeat animate__infinite animate__slower"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = new URL(
              "./../../assets/logo.png",
              import.meta.url
            ).href;
          }}
        /> */}

        <div className="pre-loader">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreLoader;
