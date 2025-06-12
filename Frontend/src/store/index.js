import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';
import doctorReducer from './slices/doctorSlice';
import callbackReducer from './slices/callbackSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    doctors: doctorReducer,
    callbacks: callbackReducer,
    ui: uiReducer,
  },
});

export default store;