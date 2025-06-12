import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for booking appointment
export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, make API call here
      // const response = await axios.post('/api/appointments', appointmentData);
      // return response.data;
      
      return {
        id: Date.now(),
        ...appointmentData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    currentAppointment: null,
    selectedDoctor: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    clearAppointmentMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
        state.currentAppointment = action.payload;
        state.successMessage = 'Appointment booked successfully!';
        state.selectedDoctor = null;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to book appointment';
      });
  },
});

export const { setSelectedDoctor, clearAppointmentMessages, resetCurrentAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;