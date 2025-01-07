import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import adminDashboardReducer from '../store/adminDashboardSlice';
import doctorReducer from '../store/doctorSlice'
import adminReducer from '../store/adminSlice'
import receptionistReducer from '../store/receptionistSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminDashboard: adminDashboardReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    receptionist: receptionistReducer
  },
});
