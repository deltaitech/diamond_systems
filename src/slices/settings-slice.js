import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/API/APi";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL.demo }),
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: (lang) => ({
        url: "settings",
        headers: {
          "Content-Type": "application/json",
          locale: lang,
        },
      }),
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;
