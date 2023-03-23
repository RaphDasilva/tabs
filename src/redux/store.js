import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './HomeSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export default store;
