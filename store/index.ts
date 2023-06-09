import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reportSlice } from "./modules/report";
import { replySlice } from "./modules/reply";

export const makeStore = () =>
  configureStore({
    reducer: {
      [reportSlice.name]: reportSlice.reducer,
      [replySlice.name]: replySlice.reducer,
    },
    // middleware: (gDM) => gDM().concat(traceApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
