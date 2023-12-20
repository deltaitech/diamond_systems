import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { defaultLang } from "../Helpers/General";

const HelmetComponent = ({ title }) => {
  const { lang } = useParams();

  //Redux
  const { data } = useSelector((state) => state.settings);
  return (
    <HelmetProvider>
      <Helmet
        htmlAttributes={{ lang: lang ?? defaultLang }}
        bodyAttributes={{ lang: lang ?? defaultLang }}
      >
        <title>{title}</title>
        <link rel="canonical" href="https://cherry-wood.com/" />
        <meta name="title" content={data.settings.meta_title} />
        <meta name="description" content={data.settings.meta_description} />
        <meta name="keywords" content={data.settings.meta_keywords} />
        <meta name="author" content="https://marwan.tech/" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={data.settings.meta_title} />
        <meta
          property="og:description"
          content={data.settings.meta_description}
        />
        <meta property="og:image" content={data.settings.logo} />

        {/* Favicon */}
        <link rel="shortcut icon" href={data.settings.favicon} />
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetComponent;
