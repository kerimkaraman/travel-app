import { configureStore } from "@reduxjs/toolkit";
import regionStyle from "./regionStyleSlice";

export const store = configureStore({
  reducer: {
    regionStyle: regionStyle,
  },
});
