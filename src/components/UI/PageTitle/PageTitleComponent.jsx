import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useGetHomeDataQuery } from "../../../slices/home-slice";
import { Fade } from "react-awesome-reveal";

import "./PageTitleComponent.scss";

const PageTitleComponent = ({ identifier }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  // RTK Query
  const { data: homeData } = useGetHomeDataQuery();
  // Destructure data from homeData
  const { pages } = homeData.data;

  const getPage = pages.find((page) => page.identifier === identifier);

  return (
    <Fade cascade damping={0.1} delay={90} direction="down">
      <div className="PageTitle">
        <h2 className="title">{getPage.title}</h2>
        <h6 className="sub_title">{getPage.sub_title}</h6>
      </div>
    </Fade>
  );
};

export default PageTitleComponent;
