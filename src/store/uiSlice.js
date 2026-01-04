import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "movie", // movie | favorite
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showMovie: (state) => {
      state.view = "movie";
    },
    showFavorite: (state) => {
      state.view = "favorite";
    },
  },
});

export const { showMovie, showFavorite } = uiSlice.actions;
export default uiSlice.reducer;
