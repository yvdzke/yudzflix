import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// popularMovies
export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopular",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Gagal fetch popular movies", err);
    }
  }
);

// topRateMovies
export const fetchTopRatedMovies = createAsyncThunk(
  "movie/fetchTopRated",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Gagal fetch top rated movies", err);
    }
  }
);

// upcomingMovies
export const fetchUpcomingMovies = createAsyncThunk(
  "movie/fetchUpcoming",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Gagal fetch upcoming movies", err);
    }
  }
);

// nowPlayingMovies
export const fetchNowPlayingMovies = createAsyncThunk(
  "movie/fetchNowPlaying",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Gagal fetch now playing movies", err);
    }
  }
);

// similarMovies
export const fetchSimilarMovies = createAsyncThunk(
  "movie/fetchSimilar",
  async (movieId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Gagal fetch similar movies", err);
    }
  }
);

// movieTrailer
export const fetchMovieTrailer = createAsyncThunk(
  "movie/fetchTrailer",
  async (movieId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );

      const trailer = res.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      return trailer ? trailer.key : null;
    } catch (err) {
      return thunkAPI.rejectWithValue("Gagal fetch trailer", err);
    }
  }
);

const initialState = {
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  similar: [],
  trailer: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Popular
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Top Rated
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated = action.payload;
      })

      // Upcoming
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })

      // Now Playing
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
      })

      // Similar
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.similar = action.payload;
      })

      // Trailer
      .addCase(fetchMovieTrailer.fulfilled, (state, action) => {
        state.trailer = action.payload;
      });
  },
});

export default movieSlice.reducer;
