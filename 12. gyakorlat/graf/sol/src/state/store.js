import { configureStore } from "@reduxjs/toolkit";

import nonogramSlice from "./nonogramSlice";
import nonogramApitSlice from "./nonogramApiSlice";

export const store = configureStore({
  reducer: {
    nonogram: nonogramSlice.reducer,
    nonogramApi: nonogramApitSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nonogramApitSlice.middleware),
});
