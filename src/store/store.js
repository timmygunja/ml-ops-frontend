import { configureStore } from "@reduxjs/toolkit";
import predictionReducer from "./predictionSlice";

export const store = configureStore({
  reducer: {
    prediction: predictionReducer,
  },
});
