import { createSlice } from "@reduxjs/toolkit";

const receptionistSlice = createSlice({
  name: "receptionist",
  initialState: {
    receptionists: [{}], 
  },
  reducers: {
    addReceptionist: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.receptionists = [...state.receptionists, ...payload];
      } else if (payload) {
        state.receptionists.push(payload);
      } else {
        console.warn("Empty payload in addReceptionist");
      }
    },
    deleteReceptionist: (state, action) => {
      const receptionistId = action.payload;
      state.receptionists = state.receptionists.filter((receptionist) => receptionist.loginId !== receptionistId);
    },
    updateReceptionist: (state, action) => {
      const { id, updates } = action.payload;
      const receptionist = state.receptionists.find((ad) => ad._id === id);
      if (receptionist) {
        Object.assign(receptionist, updates);
      } else {
        console.warn(`Receptionist with _id ${id} not found in store`);
      }
    },
  },
});

export const { addReceptionist, deleteReceptionist, updateReceptionist } = receptionistSlice.actions;

export default receptionistSlice.reducer;
