import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: null,
  images: [],
  loading: false,
  error: null,
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    setPredictionStart(state) {
      state.loading = true;
      state.error = null;
    },
    setPredictionSuccess(state, action) {
      state.loading = false;
      state.price = action.payload.prediction;
      state.images = action.payload.images;
    },
    setPredictionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPrediction(state) {
      state.price = null;
      state.images = [];
      state.error = null;
    },
  },
});

export const {
  setPredictionStart,
  setPredictionSuccess,
  setPredictionFailure,
  resetPrediction,
} = predictionSlice.actions;

export default predictionSlice.reducer;
