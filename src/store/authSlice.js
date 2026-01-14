import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL Backend Kamu
const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/auth"
  : "https://yudzflix-backend.vercel.app/api/auth";

// 1. REGISTER ACTION
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. LOGIN ACTION
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. LOGOUT ACTION
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

// Initial State
const userStorage = JSON.parse(localStorage.getItem("user"));
const tokenStorage = localStorage.getItem("token");

const initialState = {
  user: userStorage || null,
  token: tokenStorage || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reset state loading/error
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    // 🔥 INI YANG BARU: UPDATE DATA USER MANUAL
    // Dipanggil saat update profile berhasil
    loginSuccess: (state, action) => {
      state.user = action.payload;
      // Kita update state usernya dengan data baru yang dikirim dari ProfilePage
    },
  },
  extraReducers: (builder) => {
    builder
      // === REGISTER CASES ===
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // === LOGIN CASES ===
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })

      // === LOGOUT CASES ===
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

// 🔥 JANGAN LUPA EXPORT loginSuccess DI SINI
export const { reset, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
