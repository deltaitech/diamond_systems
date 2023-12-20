import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { homeAPI } from "../utils/API/APi";
import { HTTP_STATUS } from "../utils/Helpers/General";

export const fetchHomeData = createAsyncThunk(
    "HomeSlice/fetchHomeData",

    homeAPI
  );
  
  const HomeDataSlice = createSlice({
    initialState: {
      sliders: [],
      pages: [],
      charts: [],
      teams: [],
      counters: [],
      features: [],
      news: [],
      clients: [],
      certificates: [],
      isHomeDataLoading: null,
      HomeErrorMessage: null,
    },
    name: "HomeSlice",
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchHomeData.pending, (state) => {
        state.isHomeDataLoading = HTTP_STATUS.PENDING;
      });
  
      builder.addCase(fetchHomeData.fulfilled, (state, action) => {
        state.isHomeDataLoading = HTTP_STATUS.FULFILLED;
        state.sliders = action.payload.sliders;
        state.pages = action.payload.pages;
        state.charts = action.payload.charts;
        state.teams = action.payload.teams;
        state.counters = action.payload.counters;
        state.features = action.payload.features;
        state.news = action.payload.news;
        state.clients = action.payload.clients;
        state.certificates = action.payload.certificates;
        // console.log(state.galleries);
      });
  
      builder.addCase(fetchHomeData.rejected, (state, action) => {
        state.isHomeDataLoading = HTTP_STATUS.REJECTED;
        // console.log({'rejected': action});
        state.HomeErrorMessage = action.payload;
      });
    },
  });
  
  export const {} = HomeDataSlice.actions;
  export default HomeDataSlice.reducer;
  