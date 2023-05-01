import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";

export const store = configureStore({
  reducer: {
    data: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
