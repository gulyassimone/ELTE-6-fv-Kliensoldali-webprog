import { configureStore } from "@reduxjs/toolkit";

import nonogramSlice from "./nonogramSlice";
import nonogramApitSlice from "./nonogramApiSlice";
import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    nonogram: nonogramSlice.reducer,
    nonogramApi: nonogramApitSlice.reducer,
    auth: authSlice,
    authApi: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nonogramApitSlice.middleware),
});
