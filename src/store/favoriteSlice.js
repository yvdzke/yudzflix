import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://yudzflix-backend.vercel.app/api/favorites";

// Helper: Ambil Token biar lolos dari Satpam Backend
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. FETCH DATA (GET) - Support Search, Sort, Filter
export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (params = {}, thunkAPI) => {
    try {
      // Ubah params jadi query string (misal: ?genre=Action&sort=desc)
      const queryString = new URLSearchParams(params).toString();

      const response = await axios.get(
        `${API_URL}?${queryString}`,
        getAuthHeader()
      );

      // Backend ngirim data di properti .data
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Gagal mengambil data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. TAMBAH DATA (POST) - Simpan ke Database
export const addToFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (movieData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, movieData, getAuthHeader());
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Gagal menyimpan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// State Awal
const initialState = {
  movies: [], // Tetap pakai nama 'movies' biar gak usah ubah komponen lain
  loading: false,
  error: null,
};

// 3. ACTION DELETE (Hapus data di DB & State)
export const removeFromFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async (id, thunkAPI) => {
    try {
      // id ini adalah ID Postgres
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      return id; // Balikin ID biar reducer tau mana yang harus dibuang dari array
    } catch (error) {
      const message = error.response?.data?.message || "Gagal menghapus";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    // Kalau mau ada fitur hapus dari state lokal doang (opsional)
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH ===
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload; // Data dari DB masuk sini
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === ADD ===
      .addCase(addToFavorite.fulfilled, (state, action) => {
        // Opsional: Langsung push ke array biar UI update tanpa refresh
        state.movies.push(action.payload);
      })

      // === REMOVE ===
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        state.loading = false;
        // Hapus film dari array 'movies' berdasarkan ID yang dikirim
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );
        state.successMessage = "Film berhasil dihapus!";
      })
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = favoriteSlice.actions;
export default favoriteSlice.reducer;
