import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
    scrolled: false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setScrolled: (state, action) => {
      state.scrolled = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setScrolled } = uiSlice.actions;
export default uiSlice.reducer;