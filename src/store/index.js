import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
    player: playerReducer,
  },
});
