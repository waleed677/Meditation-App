import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { audioPracticeApi } from "../services/audioPractice";
import { visualPracticeApi } from "../services/visualPractice";
import { momentApi } from "../services/moments";
import { resourcesApi } from "../services/resources";
import { practicesApi } from "../services/practices";
import { authApi } from "../services/auth";
import authSlice from "../services/authSlice";
import { resourcesArticlesApi } from "../services/resourcesArticles";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [audioPracticeApi.reducerPath]: audioPracticeApi.reducer,
    [visualPracticeApi.reducerPath]: visualPracticeApi.reducer,
    [momentApi.reducerPath]: momentApi.reducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer,
    [resourcesArticlesApi.reducerPath]: resourcesArticlesApi.reducer,
    [practicesApi.reducerPath]: practicesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(audioPracticeApi.middleware)
      .concat(visualPracticeApi.middleware)
      .concat(momentApi.middleware)
      .concat(practicesApi.middleware)
      .concat(authApi.middleware)
      .concat(resourcesApi.middleware)
      .concat(resourcesArticlesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
