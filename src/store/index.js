import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import uiReducer from "./uiSlice";

// stores redux ini aku buat index biar nampung semua disini
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    movie: movieReducer,
    auth: authReducer,
    favorite: favoriteReducer,
    player: playerReducer,
  },
});
