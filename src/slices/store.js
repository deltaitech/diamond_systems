import { configureStore } from "@reduxjs/toolkit";
import HomeDataSlice from "./home-slice";
import servicesSlice from "./services-slice";
import settingsSlice from "./settings-slice";

export const store = configureStore({
  reducer: {
    home: HomeDataSlice,
    services: servicesSlice,
    settings: settingsSlice,
  },
  devTools: false,
  // middleware: [
  //   ...getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  // ],
});
