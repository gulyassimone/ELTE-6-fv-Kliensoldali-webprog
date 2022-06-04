import { configureStore } from "@reduxjs/toolkit";

import graphiLogicSlice from "./graphiLogicSlice"

export const store = configureStore({
    reducer: graphiLogicSlice,
});