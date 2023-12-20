import { useEffect, useState } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { SA, GB } from "country-flag-icons/react/3x2";
import { useSelector } from "react-redux";
import {
  LanguageDirection,
  defaultLang,
  isMultiLang,
} from "../../utils/Helpers/General";
import Logo from "../UI/Logo";

import "./Navbar.scss";

const NavbarComponent = () => {
  const expand = "lg";
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  // Redux
  const { data } = useSelector((state) => state.settings);

  // toggle offCanvas
  const [show, setShow] = useState(false);

  const toggleOffCanvas = () => {
    setShow((show) => !show);
  };

  const closeOffCanvas = () => {
    setShow(false);
  };

  // show navbar on scroll
  const [showNav, setShowNav] = useState(false);

  window.addEventListener("scroll", () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  });
  return (
    <Navbar
      key={expand}
      fixed="top"
      expand={expand}
      className="shadow-sm main-navbar "
      dir={LanguageDirection(lang ?? defaultLang)}
      // style={
      //   {
      //     backgroundColor: showNav ? "#f1eaea" : "#fff",
      //     transition: "background-color ease-in-out 800ms",
      //   }
      // }
    >
      <Container>
        <Navbar.Brand as={NavLink} to={isMultiLang ? `/${lang}` : `/`}>
          <Logo
            src={data.settings.logo}
            alt={data.settings.website_title}
            style={{
              width: "15rem",
              height: "4.5rem",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          onClick={toggleOffCanvas}
        />
        <Navbar.Offcanvas
          lang={lang ?? defaultLang}
          dir={LanguageDirection(lang ?? defaultLang)}
          id={`offcanvasNavbar-expand-${expand}}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement={
            LanguageDirection(lang ?? defaultLang) === "rtl" ? "end" : "start"
          }
          show={show}
          onHide={toggleOffCanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <Logo
                src={data.settings.logo}
                alt={data.settings.website_title}
                style={{
                  width: "15rem",
                  height: "4.5rem",
                }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1">
              <Nav.Link
                as={NavLink}
                to={isMultiLang ? `/${lang}` : `/`}
                end
                onClick={closeOffCanvas}
              >
                {t("words:navbar.home")}
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to={isMultiLang ? `/${lang}/about` : `/about`}
                onClick={closeOffCanvas}
              >
                {t("words:navbar.about")}
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to={isMultiLang ? `/${lang}/services` : `/services`}
                onClick={closeOffCanvas}
              >
                {t("words:navbar.services")}
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to={isMultiLang ? `/${lang}/contact` : `/contact`}
                onClick={closeOffCanvas}
              >
                {t("words:navbar.contact")}
              </Nav.Link>

              {isMultiLang && (
                <Nav.Link
                  onClick={() => {
                    setShow(false);
                    navigate(
                      location.pathname.replace(
                        `/${lang}`,
                        `${
                          LanguageDirection(lang ?? defaultLang) === "rtl"
                            ? "/en"
                            : "/ar"
                        }`
                      )
                    );
                  }}
                >
                  {LanguageDirection(lang ?? defaultLang) === "rtl" ? (
                    <GB width="1.5rem" />
                  ) : (
                    <SA width="1.5rem" />
                  )}
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
