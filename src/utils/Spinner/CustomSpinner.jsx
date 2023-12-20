import React from "react";
import { Spinner } from "react-bootstrap";

import './CustomSpinner.scss';

const CustomSpinner = () => {
  return (
    <>
      <Spinner animation="border" role="status" className="custom_spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default CustomSpinner;
