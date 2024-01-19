import { configureStore } from "@reduxjs/toolkit";
import regionStyle from "./regionStyleSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    regionStyle: regionStyle,
    user: userSlice,
  },
});
