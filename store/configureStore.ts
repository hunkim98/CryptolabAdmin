import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer, { RootState } from "./modules";

export const store = configureStore({
  reducer: rootReducer as Reducer<RootState, AnyAction>,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const wrapper = createWrapper(() => store, {
  // debug: process.env.NODE_ENV === "development",
});

export default wrapper;
