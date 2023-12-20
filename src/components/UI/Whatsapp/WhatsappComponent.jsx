import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LanguageDirection, defaultLang } from "../../../utils/Helpers/General";

import "./WhatsappComponent.scss";

const WhatsappComponent = () => {
  const { lang } = useParams();
  const { data } = useSelector((state) => state.settings);
  const number = data.contacts?.whatsapp?.map((number) => number.contact);

  return (
    data.contacts?.whatsapp.length > 0 && (
      <div
        className="phone-call cbh-phone cbh-green cbh-show  cbh-static"
        id="clbh_phone_div"
        dir={LanguageDirection(lang ?? defaultLang)}
      >
        <Link
          id="WhatsApp-button"
          to={`https://wa.me/${number}`}
          target="_blank"
          className="phoneJs"
          title="WhatsApp 360imagem"
        >
          <div className="cbh-ph-circle"></div>
          <div className="cbh-ph-circle-fill"></div>
          <div className="cbh-ph-img-circle1 d-flex justify-content-center align-items-center">
            <i className="fab fa-whatsapp text-white fa-2x"></i>
          </div>
        </Link>
      </div>
    )
  );
};

export default WhatsappComponent;
