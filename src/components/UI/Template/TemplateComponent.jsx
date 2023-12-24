import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useGetHomeDataQuery } from "../../../slices/home-slice";
import { useGetSettingsQuery } from "../../../slices/settings-slice";
import { useGetAllServicesQuery } from "../../../slices/services-slice";

import PreLoader from "../../../utils/Pre-Loader/PreLoader";
import HelmetComponent from "../../../utils/Helmet/HelmetComponent";
import NavbarComponent from "../../Navbar/NavbarComponent";
import {
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../../utils/Helpers/General";
import FooterComponent from "../Footer/FooterComponent";
import WhatsappComponent from "../Whatsapp/WhatsappComponent";
import ScrollToTopComponent from "../ScrollToTop/ScrollToTopComponent";

const TemplateComponent = ({ children }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // handle wrong locale
  useEffect(() => {
    const availableLanguages = ["ar", "en"];
    if (isMultiLang) {
      if (!availableLanguages.includes(lang)) {
        navigate(location.pathname.replace(`/${lang}`, "/ar"));
      }
    }
  }, [lang]);

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  // Settings RTK query
  const { isLoading: settingsLoading, isError: settingsError } =
    useGetSettingsQuery();

  const { isLoading: homeLoading, isError: homeError } = useGetHomeDataQuery();

  const { isLoading: servicesLoading, isError: servicesError } =
    useGetAllServicesQuery();

  return homeLoading ||
    homeError ||
    servicesLoading ||
    servicesError ||
    settingsLoading ||
    settingsError ? (
    <PreLoader />
  ) : (
    <>
      <HelmetComponent />
      <NavbarComponent />
      <main className="main_template">{children}</main>
      <ScrollToTopComponent />
      <FooterComponent />
      <WhatsappComponent />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={LanguageDirection(lang ?? defaultLang) === "rtl" ? true : false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default TemplateComponent;
