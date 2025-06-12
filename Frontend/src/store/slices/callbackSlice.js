import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for requesting callback
export const requestCallback = createAsyncThunk(
  'callbacks/requestCallback',
  async (callbackData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, make API call here
      // const response = await axios.post('/api/callbacks', callbackData);
      // return response.data;
      
      return {
        id: Date.now(),
        ...callbackData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const callbackSlice = createSlice({
  name: 'callbacks',
  initialState: {
    callbacks: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCallbackMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestCallback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestCallback.fulfilled, (state, action) => {
        state.loading = false;
        state.callbacks.push(action.payload);
        state.successMessage = "We'll get back to you shortly!";
      })
      .addCase(requestCallback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit callback request';
      });
  },
});

export const { clearCallbackMessages } = callbackSlice.actions;
export default callbackSlice.reducer;