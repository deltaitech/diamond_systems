import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceAPI } from "../utils/API/APi";
import { HTTP_STATUS } from "../utils/Helpers/General";

export const fetchServicesData = createAsyncThunk(
  "servicesSlice/fetchServicesData",
  serviceAPI
);

const ServiceDataSlice = createSlice({
  initialState: {
    services: [],
    isServiceDataLoading: null,
    ServiceErrorMessage: null,
  },
  name: "servicesSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServicesData.pending, (state) => {
      state.isServiceDataLoading = HTTP_STATUS.PENDING;
    });

    builder.addCase(fetchServicesData.fulfilled, (state, action) => {
      state.isServiceDataLoading = HTTP_STATUS.FULFILLED;
      state.services = action.payload.services;
      // console.log(state.services);
    });

    builder.addCase(fetchServicesData.rejected, (state, action) => {
      state.isServiceDataLoading = HTTP_STATUS.REJECTED;
      // console.log({'rejected': action});
      state.ServiceErrorMessage = action.payload;
    });
  },
});

export const {} = ServiceDataSlice.actions;
export default ServiceDataSlice.reducer;
