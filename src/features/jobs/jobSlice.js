
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../servies/axiosInstance.js";

// Async action to create a job
export const createJob = createAsyncThunk(
    "jobs/createJob",
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/employer",
                jobData
            );

            return response.data;
        } catch (error) {
            const errorData = error.response?.data;

            const message =
                errorData?.message ||
                (typeof errorData === "string" ? errorData : null) ||
                error.message ||
                "Failed to create job";

            return rejectWithValue(message);
        }
    }
);

const initialState = {
    createdJob: null,
    status: "idle",
    error: null,
};

const jobsSlice = createSlice({
    name: "jobs",
    initialState,

    reducers: {
        resetCreateJobState: (state) => {
            state.createdJob = null;
            state.status = "idle";
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })

            .addCase(createJob.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.createdJob = action.payload;
            })

            .addCase(createJob.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { resetCreateJobState } = jobsSlice.actions;

export default jobsSlice.reducer;
