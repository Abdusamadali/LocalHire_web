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

// Signup API call
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", signupData);

      return response.data;
    } catch (error) {
      console.error("Signup API error:", error);

      if (error.response) {
        const data = error.response.data;

        return rejectWithValue(
          typeof data === "string"
            ? data
            : data?.detail ||
                data?.error ||
                data?.message ||
                `Signup failed: ${error.response.status}`,
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

  signupStatus: "idle",
  signupError: null,
  signupMessage: null,
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

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
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
      })
      ///signUp thing
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = "loading";
        state.signupError = null;
        state.signupMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupStatus = "succeeded";
        state.signupMessage =
          action.payload?.message || "Account created successfully.";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.signupError = action.payload || action.error?.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
