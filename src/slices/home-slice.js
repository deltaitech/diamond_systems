import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/API/APi";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL.demo }),
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: (lang) => ({
        url: "home",
        headers: {
          "Content-Type": "application/json",
          locale: lang,
        },
      }),
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;
