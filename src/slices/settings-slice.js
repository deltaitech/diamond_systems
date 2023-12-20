import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { settingsAPI } from "../utils/API/APi";
import { HTTP_STATUS } from "../utils/Helpers/General";

export const fetchSettingsData = createAsyncThunk(
  "SettingsSlice/fetchSettingsData",
  settingsAPI
);

const SettingsSlice = createSlice({
  initialState: {
    data: {},
    isSettingsDataLoading: [],
    isSettingsDataLoading: null,
    SettingsErrorMessage: null,
  },
  name: "SettingsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettingsData.pending, (state) => {
      state.isSettingsDataLoading = HTTP_STATUS.PENDING;
    });
    builder.addCase(fetchSettingsData.fulfilled, (state, action) => {
      state.isSettingsDataLoading = HTTP_STATUS.FULFILLED;
      state.data = action.payload;
      // console.log("settings action", state.data);
    });

    builder.addCase(fetchSettingsData.rejected, (state, action) => {
      state.isSettingsDataLoading = HTTP_STATUS.REJECTED;
      // console.log(action.error);
      state.SettingsErrorMessage = action.payload;
    });
  },
});

export const {} = SettingsSlice.actions;
export default SettingsSlice.reducer;
