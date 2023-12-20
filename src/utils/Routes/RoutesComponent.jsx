import { Navigate, Route, Routes } from "react-router-dom";
import { defaultLang, isMultiLang } from "../Helpers/General";

import TemplateComponent from "../../components/UI/Template/TemplateComponent";
import HomePage from "../../Pages/HomePage/HomePage";
import AboutPage from "../../Pages/AboutPage/AboutPage";
import ContactPage from "../../Pages/Contact/ContactPage";
import NotFoundPage from "../404/NotFoundPage";
import ServicesPage from "../../Pages/Services/ServicesPage";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        {isMultiLang ? (
          <Route path="/" element={<Navigate to={`/${defaultLang}`} />} />
        ) : (
          <Route path={`/${defaultLang}`} element={<Navigate to="/" />} />
        )}

        <Route
          path={isMultiLang ? "/:lang" : "/"}
          element={
            <TemplateComponent>
              <HomePage />
            </TemplateComponent>
          }
        />

        <Route
          path={isMultiLang ? "/:lang/about" : "/about"}
          element={
            <TemplateComponent>
              <AboutPage />
            </TemplateComponent>
          }
        />

        <Route
          path={isMultiLang ? "/:lang/services" : "/services"}
          element={
            <TemplateComponent>
              <ServicesPage />
            </TemplateComponent>
          }
        />

        <Route
          path={isMultiLang ? "/:lang/contact" : "/contact"}
          element={
            <TemplateComponent>
              <ContactPage />
            </TemplateComponent>
          }
        />

        <Route
          path={isMultiLang ? "/:lang/*" : "/*"}
          element={
            <TemplateComponent>
              <NotFoundPage />
            </TemplateComponent>
          }
        />
      </Routes>
    </>
  );
};

export default RoutesComponent;
