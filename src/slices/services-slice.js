import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/API/APi";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL.demo }),
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (lang) => ({
        url: "services",
        headers: {
          "Content-Type": "application/json",
          locale: lang,
        },
      }),
    }),
  }),
});

export const { useGetAllServicesQuery } = servicesApi;
