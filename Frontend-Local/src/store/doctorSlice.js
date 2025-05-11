import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
  },
  reducers: {
    addDoctor: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.doctors = [...state.doctors, ...payload];
      } else if (payload) {
        state.doctors.push(payload);
      } else {
        console.warn("Empty payload in addDoctor");
      }
    },
    deleteDoctor: (state, action) => {
      const doctorId = action.payload;
      state.doctors = state.doctors.filter((doctor) => doctor.loginId !== doctorId);
    },
    updateDoctor: (state, action) => {
      const { loginId, updates } = action.payload;
      const doctor = state.doctors.find((doc) => doc.loginId === loginId);
      if (doctor) {
        Object.assign(doctor, updates);
      }
    },
  },
});

export const { addDoctor, deleteDoctor, updateDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
