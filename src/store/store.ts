import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './filesSlice';

const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
