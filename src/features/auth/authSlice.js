import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../servies/axiosInstance";

// Login API call
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);

      const { token, id, role } = response.data;

      // Save authentication details
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);

      return { token, id, role };
    } catch (error) {
      console.error("Login API error:", error);

      if (error.response) {
        return rejectWithValue(
          error.response.data?.message ||
            error.response.data?.error ||
            `Server error: ${error.response.status}`,
        );
      }

      if (error.request) {
        return rejectWithValue(
          "Cannot connect to the server. Check your backend connection.",
        );
      }

      return rejectWithValue(error.message);
    }
  },
);

// Initial state
const initialState = {
  token: localStorage.getItem("token") || null,

  user: {
    id: localStorage.getItem("userId") || null,
    role: localStorage.getItem("role") || null,
  },

  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = {
        id: null,
        role: null,
      };
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = {
          id: action.payload.id,
          role: action.payload.role,
        };
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
