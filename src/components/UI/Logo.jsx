import React from "react";
import { Image } from "react-bootstrap";

const Logo = ({ src, alt, style, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      style={style}
      className={className ?? ""}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = new URL(
          "../../assets/logo.png",
          import.meta.url
        ).href;
      }}
    />
  );
};

export default Logo;
