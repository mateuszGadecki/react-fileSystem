import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFiles = createAsyncThunk('files/getFiles', async () => {
  return fetch('https://60c9caa8772a760017204706.mockapi.io/api/v1/files').then((response) => response.json());
});

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFiles.fulfilled, (state, { payload }) => {
      state.files = payload;
      state.loading = false;
    });
    builder.addCase(getFiles.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default filesSlice.reducer;
