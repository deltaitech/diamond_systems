export const HTTP_STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export const isMultiLang = false;
export const defaultLang = "ar";

export const FormatCurrency = (number, lang) => {
  return new Intl.NumberFormat(LanguageDirection(lang ?? defaultLang) === "rtl" ? "ar-EG" : undefined, {
    currency: "EGP",
    style: "currency",
  }).format(Math.round(number));
  // +number.toFixed(2) to use 2 decimal places ONLY
};

export const FormatNumber = (number, lang) => {
  return new Intl.NumberFormat(LanguageDirection(lang ?? defaultLang) === "rtl" ? "ar-EG" : undefined).format(
    Math.round(number)
  );
};

// Modify Google Maps URL
export const fixGoogleMaps = (urlLink) => {
  return urlLink.replace("www.google.com", "maps-api-ssl.google.com");
};

// Language direction
export const LanguageDirection = (lang) => {
  return lang === "en" ? "ltr" : "rtl";
};
