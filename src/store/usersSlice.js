import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockData from '../data/mockData.json';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Simulate async fetch with 1s delay (mirrors original setTimeout)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockData.users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state) => state.users.list;
export const selectUsersStatus = (state) => state.users.status;

export default usersSlice.reducer;
