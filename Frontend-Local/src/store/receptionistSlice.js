import { createSlice } from "@reduxjs/toolkit";

const receptionistSlice = createSlice({
  name: "receptionist",
  initialState: {
    receptionists: [{
      id : "111",
      name: "receptionist123",
      email: "receptionist@gmail.com",
      experience: "20",
      phone: "123-456-7890",
  }], 
  },
  reducers: {
    addReceptionist: (state, action) => {
      state.receptionists.push(action.payload);
    },
    deleteReceptionist: (state, action) => {
      const receptionistId = action.payload;
      state.receptionists = state.receptionists.filter((rec) => rec.id !== receptionistId);
    },
    updateReceptionist: (state, action) => {
      const { id, updates } = action.payload;
      const receptionist = state.receptionists.find((rec) => rec.id === id);
      if (receptionist) {
        Object.assign(receptionist, updates); 
      }
    },
  },
});

export const { addReceptionist, deleteReceptionist, updateReceptionist } = receptionistSlice.actions;

export default receptionistSlice.reducer;
