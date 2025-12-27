import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";

// stores redux ini aku buat index biar nampung semua disini
export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
    player: playerReducer,
  },
});
