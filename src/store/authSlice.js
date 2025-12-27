import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "https://69424ac3686bc3ca81692912.mockapi.io/yvdzke/users";

// register
export const registerAuth = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(AUTH_URL, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Successfully Failed Register :3", err);
    }
  }
);

// loginUser
export const loginAuth = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await axios.get(AUTH_URL);

      const user = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return thunkAPI.rejectWithValue("Wrong username or password");
      }

      // fakeToken
      const token = btoa(`${user.id}:${Date.now()}`);

      return { user, token };
    } catch (err) {
      return thunkAPI.rejectWithValue("Successfully Failed Login", err);
    }
  }
);

// getUser
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get(AUTH_URL);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Succesfully Failled getUsers", err);
  }
});

// deleteUser
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${AUTH_URL}/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue("Succesfully Failed", err);
    }
  }
);

// initialState
const initialState = {
  users: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};
// authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // case getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // case register
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // case login
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  case deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
