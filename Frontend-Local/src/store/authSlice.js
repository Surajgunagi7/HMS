import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, role } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.role = role;  
    },
    addUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { login, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
