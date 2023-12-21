import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { servicesApi } from "./services-slice";
import { settingsApi } from "./settings-slice";
import { homeApi } from "./home-slice";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      settingsApi.middleware,
      homeApi.middleware,
      servicesApi.middleware,
    ]),
});

setupListeners(store.dispatch);
