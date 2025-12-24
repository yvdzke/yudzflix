import { createSlice } from "@reduxjs/toolkit";
console.log("favoriteSlice loaded");

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    movies: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.movies.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
