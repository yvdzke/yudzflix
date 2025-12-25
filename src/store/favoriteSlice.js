import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: JSON.parse(localStorage.getItem("favoriteMovies")) || [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.movies.find(
        (movie) => movie.id === action.payload.id
      );

      if (!exists) {
        state.movies.push(action.payload);
        localStorage.setItem("favoriteMovies", JSON.stringify(state.movies));
      }
    },

    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );

      localStorage.setItem("favoriteMovies", JSON.stringify(state.movies));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
