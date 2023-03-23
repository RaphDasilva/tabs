import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-tabs-project';

export const getJobs = createAsyncThunk('jobs/getJobs', async () => {
  const result = await axios(url);
  return result.data;
});

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getJobs.fulfilled, (state, action) => (
        {
          ...state,
          jobs: action.payload,
          status: 'succeeded',
        }
      ))
      .addCase(getJobs.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const jobsActions = jobSlice.actions;
export default jobSlice.reducer;
