import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { api } from "../../utils/API/APi";

import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

import {
  FormatNumber,
  LanguageDirection,
  defaultLang,
} from "../../utils/Helpers/General";

import { Fade, Zoom } from "react-awesome-reveal";
import "./ContactForm.scss";

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang ?? defaultLang);
  }, [lang]);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, t("words:validation.minimum_characters", { number: 2 }))
      .max(70, t("words:validation.maximum_characters", { number: 70 }))
      .required(t("words:validation.required")),
    email: yup
      .string()
      .email(t("words:validation.email"))
      .required(t("words:validation.required")),
    message: yup
      .string()
      .min(5, t("words:validation.minimum_characters", { number: 2 }))
      .max(500, t("words:validation.maximum_characters", { number: 500 }))
      .required(t("words:validation.required")),
    phone: yup
      .string()
      .required(t("words:validation.required"))
      .min(6, t("words:validation.minimum_characters", { number: 6 }))
      .matches(/^[0-9+]+/, t("words:validation.format")),
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });

  // Refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const phoneRef = useRef(null);

  const displayToast = (statusCode, message) => {
    switch (statusCode) {
      case 200:
        toast.success(message);
        break;
      case 400:
        toast.error(message);
        break;
      default:
        toast.error(t("words:validation.message.api_error"));
        break;
    }
  };

  const countMessage = watch("message");

  const onSubmit = async (data) => {
    await api
      .post("contact", data, {
        headers: {
          "Content-Type": "application/json",
          locale: lang ?? defaultLang,
        },
      })
      .then((res) => {
        reset();
        displayToast(res.status, res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Object.keys(err.response.data.data).forEach((key) => {
            displayToast(400, err.response.data.data[key][0]);
          });
        } else {
          displayToast(err.response.status, err.response.message);
        }
      });
  };

  return (
    <>
      <Col lg={6} md={6} sm={12} xs={12}>
        <Form onSubmit={handleSubmit(onSubmit)} className="contactForm">
          <Row>
            {/* Full Name */}
            <Col xs={12} sm={12} md={6}>
              <Fade
                direction={
                  LanguageDirection(lang ?? defaultLang) === "ltr"
                    ? "left"
                    : "right"
                }
                delay={25}
              >
                <FormGroup as={Col} className="mb-3 h-100" controlId="name">
                  <FormLabel className="text-capitalize">
                    {t("words:form.name")}
                  </FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        {...field}
                        ref={nameRef}
                        isInvalid={errors?.name}
                        placeholder={t("words:form.placeholders.name")}
                        type="text"
                        autoComplete="off"
                        className="text-capitalize"
                      />
                    )}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.name?.message}
                  </FormControl.Feedback>
                </FormGroup>
              </Fade>
            </Col>

            {/* Phone */}
            <Col xs={12} sm={12} md={6}>
              <Fade direction={lang === "en" ? "right" : "left"} delay={25}>
                <Form.Group className="mb-3" controlId="phone">
                  <FormLabel className="text-capitalize">
                    {t("words:form.phone")}
                  </FormLabel>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        {...field}
                        ref={phoneRef}
                        isInvalid={errors?.phone}
                        placeholder={t("words:form.placeholders.phone")}
                        type="text"
                        autoComplete="off"
                        className="text-capitalize"
                      />
                    )}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.phone?.message}
                  </FormControl.Feedback>
                </Form.Group>
              </Fade>
            </Col>
          </Row>

          <Row>
            {/* Email */}
            <Col xs={12} sm={12} md={12}>
              <Fade
                direction={
                  LanguageDirection(lang ?? defaultLang) === "ltr"
                    ? "right"
                    : "left"
                }
                delay={50}
              >
                <FormGroup as={Col} className="mb-3 h-100" controlId="email">
                  <FormLabel className="text-capitalize">
                    {t("words:form.email")}
                  </FormLabel>

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        {...field}
                        ref={emailRef}
                        isInvalid={errors?.email}
                        placeholder="mail@domain.com"
                        type="email"
                        autoComplete="off"
                      />
                    )}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.email?.message}
                  </FormControl.Feedback>
                </FormGroup>
              </Fade>
            </Col>
          </Row>

          <Row>
            {/* Message */}
            <Col xs={12} sm={12} md={12}>
              <Fade
                direction={
                  LanguageDirection(lang ?? defaultLang) === "ltr"
                    ? "right"
                    : "left"
                }
                delay={25}
              >
                <Form.Group className="mb-3" controlId="message">
                  <FormLabel className="text-capitalize">
                    {t("words:form.message")}
                  </FormLabel>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={messageRef}
                        isInvalid={errors?.email}
                        as="textarea"
                        rows={8}
                        style={{
                          resize: "none",
                        }}
                        placeholder={t("words:form.placeholders.message")}
                        autoComplete="off"
                      />
                    )}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.message?.message}
                  </FormControl.Feedback>
                  <div className="message_counter text-muted">
                    {FormatNumber(countMessage.length, lang)}{" "}
                    {t("words:validation.message.length", {
                      max: FormatNumber(500, lang),
                    })}
                  </div>
                </Form.Group>
              </Fade>
            </Col>
          </Row>

          <Zoom cascade>
            <Row className="d-flex justify-content-center  mt-5">
              <button
                type="submit"
                className="contact_btn form-control"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("words:form.sending")}
                  </>
                ) : (
                  t("words:form.send")
                )}
              </button>
            </Row>
          </Zoom>
        </Form>
      </Col>
    </>
  );
};

export default ContactForm;
