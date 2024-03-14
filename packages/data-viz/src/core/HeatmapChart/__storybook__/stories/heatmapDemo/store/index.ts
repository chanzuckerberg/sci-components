import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataReducer";

export const store = configureStore({
  reducer: {
    dataReducer: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
