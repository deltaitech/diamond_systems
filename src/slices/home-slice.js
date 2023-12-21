import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/API/APi";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL.demo }),
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: () => "home",
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;
