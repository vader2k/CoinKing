import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/CryptoApi";

export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cryptoApi.middleware),
  })