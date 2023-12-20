import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CustomButton.scss";

const CustomButton = ({
  link,
  target,
  linkTitle,
  onclick = () => {},
  hasLink = true,
  className,
}) => {
  return (
    <>
      {hasLink ? (
        <Link to={link} target={target}>
          <Button className={`customBtn btn-sm ${className}`} onClick={onclick}>
            {linkTitle}
          </Button>
        </Link>
      ) : (
        <Button className={`customBtn btn-sm ${className}`} onClick={onclick}>
          {linkTitle}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
