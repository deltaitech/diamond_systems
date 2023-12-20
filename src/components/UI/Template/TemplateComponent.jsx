import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import { fetchHomeData } from "../../../slices/home-slice";
import { fetchSettingsData } from "../../../slices/settings-slice";
import { fetchServicesData } from "../../../slices/services-slice";

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
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchHomeData(lang ?? defaultLang));
    dispatch(
      fetchServicesData({ lang: lang ?? defaultLang, searchParams: {} })
    );
    dispatch(fetchSettingsData(lang ?? defaultLang));
  }, [lang]);

  const { isHomeDataLoading } = useSelector((state) => state.home);
  const { isServiceDataLoading } = useSelector((state) => state.services);
  const { isSettingsDataLoading } = useSelector((state) => state.settings);

  return isHomeDataLoading !== "fulfilled" ||
    isServiceDataLoading !== "fulfilled" ||
    isSettingsDataLoading !== "fulfilled" ? (
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
