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
      // userData isinya: { fullname, username, email, password }
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      // Tangkap pesan error dari backend (misal: "Email sudah terdaftar")
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. LOGIN ACTION
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      // userData isinya: { email, password }
      const response = await axios.post(`${API_URL}/login`, userData);

      // PENTING: Simpan Token & User ke LocalStorage biar sesi awet
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data; // Isinya { message, token, user }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. LOGOUT ACTION (Hapus jejak)
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

// Initial State (Cek apakah ada data tersimpan sebelumnya?)
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
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
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
        // Register biasanya gak langsung login, jadi user tetep null dulu
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Pesan error dari backend
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

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
