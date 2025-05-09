import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [{
      id : "11",
      name: "admin123",
      email: "admin@gmail.com",
      password: "20",
      phone: "123-456-7890",
  }], 
  },
  reducers: {
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
    deleteAdmin: (state, action) => {
      const adminId = action.payload;
      state.admins = state.admins.filter((admin) => admin.id !== adminId);
    },
    updateAdmin: (state, action) => {
      const { id, updates } = action.payload;
      const admin = state.admins.find((ad) => ad.id === id);
      if (admin) {
        Object.assign(admin, updates); 
      }
    },
  },
});

export const { addAdmin, deleteAdmin, updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
