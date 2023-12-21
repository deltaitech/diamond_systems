import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";

import { useGetAllServicesQuery } from "../../slices/services-slice";
import { useGetSettingsQuery } from "../../slices/settings-slice";

import BreadcrumbComponent from "../../components/UI/Breadcrumb/BreadcrumbComponent";
import ItemsComponent from "../../components/Items/ItemsComponent";
import CustomSpinner from "../../utils/Spinner/CustomSpinner";

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  //RTQ Query
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery();
  const { data: settingsData } = useGetSettingsQuery();

  // Destructure data from servicesData
  const { services } = servicesData.data;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [lang]);

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  return (
    <>
      {/* Page title */}
      <HelmetComponent
        title={`${settingsData.data.settings.website_title} | ${t(
          "words:navbar.services"
        )}`}
      />
      <BreadcrumbComponent current={t("words:navbar.services")} />
      {/* Services */}
      <section
        className="serviceSection"
        dir={LanguageDirection(lang ?? defaultLang)}
      >
        {isLoading || isError ? (
          <CustomSpinner />
        ) : (
          <ItemsComponent
            items={services}
            hasTitle={false}
            hasDescription={false}
            name={"services"}
          />
        )}
      </section>
    </>
  );
};

export default ServicesPage;
