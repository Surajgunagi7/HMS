import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
  },
  reducers: {
    setAppointments: (state, action) => {
      state.list = action.payload;
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.list.findIndex((apt) => apt._id === id);
      if (index !== -1) {
        state.list[index].status = status;
      }
    },
  },
});

export const { setAppointments, updateAppointmentStatus } = appointmentSlice.actions;
export default appointmentSlice.reducer;
