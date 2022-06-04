import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import tasklistApiSlice from "./tasklistSlice";
import { createLogger } from "redux-logger/src";

const logger = createLogger({});


export const store = configureStore({
  reducer: {
    tasklist: tasklistApiSlice.reducer,
    auth: authSlice,
    authApi: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true
});
