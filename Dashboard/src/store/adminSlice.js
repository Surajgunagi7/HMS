import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
  },
  reducers: {
    addAdmin: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.admins = [...state.admins, ...payload];
      } else if (payload) {
        state.admins.push(payload);
      } else {
        console.warn("Empty payload in addAdmin");
      }
    },
    deleteAdmin: (state, action) => {
      const adminId = action.payload;
      state.admins = state.admins.filter((admin) => admin.loginId !== adminId);
    },
    updateAdmin: (state, action) => {
      const { id, updates } = action.payload;
      const admin = state.admins.find((ad) => ad._id === id);
      if (admin) {
        Object.assign(admin, updates);
      } else {
        console.warn(`Admin with _id ${id} not found in store`);
      }
    },
  },
});

export const { addAdmin, deleteAdmin, updateAdmin } = adminSlice.actions;
export default adminSlice.reducer;
