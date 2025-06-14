import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
  },
  reducers: {
    addDoctor: (state, action) => {
      const payload = action.payload;
      state.doctors = payload
    },
    deleteDoctor: (state, action) => {
      const doctorId = action.payload;
      state.doctors = state.doctors.filter((doctor) => doctor.loginId !== doctorId);
    },
    updateDoctor: (state, action) => {
      const { loginId, updates } = action.payload;
      const doctorIndex = state.doctors.findIndex((doc) => doc.loginId === loginId);
      if (doctorIndex !== -1) {
        state.doctors[doctorIndex] = { ...state.doctors[doctorIndex], ...updates };
      }
    },
    // Alternative: Update by _id (MongoDB ID) - more reliable
    updateDoctorById: (state, action) => {
      const { _id, updates } = action.payload;
      const doctorIndex = state.doctors.findIndex((doc) => doc._id === _id);
      if (doctorIndex !== -1) {
        // Use spread operator to merge updates with existing doctor data
        state.doctors[doctorIndex] = { 
          ...state.doctors[doctorIndex], 
          ...updates 
        };
      }
    },
  },
});

export const { addDoctor, deleteDoctor, updateDoctor, updateDoctorById } = doctorSlice.actions;
export default doctorSlice.reducer;