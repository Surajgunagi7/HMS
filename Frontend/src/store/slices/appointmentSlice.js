import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {service} from '../../service/apiCallService.js'

const extractErrorMessage = (htmlString) => {
  if (typeof htmlString !== 'string') return null;
  
  const preMatch = htmlString.match(/<pre>Error: ([^<]+)<br>/);
  if (preMatch && preMatch[1]) {
    return preMatch[1].trim();
  }
  
  const errorMatch = htmlString.match(/Error: ([^<\n]+)/);
  if (errorMatch && errorMatch[1]) {
    return errorMatch[1].trim();
  }
  
  return null;
}

export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const PatientData = {
          name: appointmentData.name,
          age: appointmentData.age,
          email: appointmentData.email,
          phone: appointmentData.phone,
      }
      const patientResponse = await service.createOrFindPatient(PatientData)
      const patientId = patientResponse.data.data._id;
      const appointmentPayload = {
          patient: patientId,
          doctor: appointmentData.doctor,
          reason: appointmentData.reason,
          dateTime: `${appointmentData.date}T${appointmentData.time}:00.000Z`,
          status: "pending",
          paymentStatus: "pending"
        };
      const response = await service.createAppointment(appointmentPayload);
      console.log('Booking appointment with data:', response.data);
      
      return {
        ...appointmentData,
        ...response.data.data,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
        
        if (typeof error.response.data === 'string') {
          const extractedMessage = extractErrorMessage(error.response.data);
          if (extractedMessage) {
            return rejectWithValue(extractedMessage);
          }
        }
        
        if (typeof error.response.data === 'object') {
          return rejectWithValue(error.response.data.error || 'An error occurred');
        }
      }
      
      return rejectWithValue(error.message || 'Something went wrong');
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