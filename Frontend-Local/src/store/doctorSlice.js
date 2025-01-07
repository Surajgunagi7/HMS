import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [{
      id : "1",
      name: "doctor123",
      email: "doctor@gmail.com",
      specialization: "Cardiologist",
      experience: "20",
      education: "MBBS, MD (Cardiology)",
      phone: "123-456-7890",
      about: "doctor123 is a highly experienced cardiologist specializing in advanced cardiac care and interventions, with a career spanning over two decades.",
  }], 
  },
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    deleteDoctor: (state, action) => {
      const doctorId = action.payload;
      state.doctors = state.doctors.filter((doc) => doc.id !== doctorId);
    },
    updateDoctor: (state, action) => {
      const { id, updates } = action.payload;
      const doctor = state.doctors.find((doc) => doc.id === id);
      if (doctor) {
        Object.assign(doctor, updates); 
      }
    },
  },
});

export const { addDoctor, deleteDoctor, updateDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
