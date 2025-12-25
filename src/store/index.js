import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import playerReducer from "./playerSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    player: playerReducer,
  },
});
