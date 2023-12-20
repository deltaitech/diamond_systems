import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { LanguageDirection, defaultLang } from "../../utils/Helpers/General";
import HelmetComponent from "../../utils/Helmet/HelmetComponent";

import BreadcrumbComponent from "../../components/UI/Breadcrumb/BreadcrumbComponent";
import ItemsComponent from "../../components/Items/ItemsComponent";
import { useSelector } from "react-redux";
import CustomSpinner from "../../utils/Spinner/CustomSpinner";

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  //Redux
  const { pages } = useSelector((state) => state.home);
  const servicesPage = pages.find(
    (page) => page.identifier === "services_page"
  );
  const { services, isServiceDataLoading } = useSelector(
    (state) => state.services
  );
  const { data } = useSelector((state) => state.settings);

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
        title={`${data.settings.website_title} | ${t("words:navbar.services")}`}
      />
      <BreadcrumbComponent current={t("words:navbar.services")} />
      {/* Services */}
      <section
        className="serviceSection"
        dir={LanguageDirection(lang ?? defaultLang)}
      >
        {isServiceDataLoading !== "fulfilled" ? (
          <CustomSpinner />
        ) : (
          <ItemsComponent
            items={services}
            hasTitle={true}
            hasDescription={true}
            title={servicesPage.title}
            description={servicesPage.description}
            name={"services"}
          />
        )}
      </section>
    </>
  );
};

export default ServicesPage;
