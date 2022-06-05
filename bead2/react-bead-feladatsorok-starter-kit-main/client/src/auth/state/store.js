import {configureStore } from "@reduxjs/toolkit";

import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import tasklistApiSlice from "../../tasklists/state/tasklistSlice";
import { createLogger } from "redux-logger/src";

const logger = createLogger({});


export const store = configureStore({
  reducer: {
    tasklistApi: tasklistApiSlice.reducer,
    auth: authSlice,
    authApi: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,tasklistApiSlice.middleware ),
  devTools: true
});
