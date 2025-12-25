import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMovie: null,
  trailerKey: null,
  isOpen: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playMovie: (state, action) => {
      state.activeMovie = action.payload;
      state.trailerKey = null;
      state.isOpen = true;
    },
    setTrailerKey: (state, action) => {
      state.trailerKey = action.payload;
    },
    closePlayer: (state) => {
      state.activeMovie = null;
      state.trailerKey = null;
      state.isOpen = false;
    },
  },
});

export const { playMovie, setTrailerKey, closePlayer } = playerSlice.actions;

export default playerSlice.reducer;
