import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {service} from '../../service/apiCallService.js';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getDoctorList();
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    filteredDoctors: [],
    specializations: ['All', 'Cardiology', 'ENT', 'Dermatology', 'Orthopedics', 'Pediatrics', 'Neurology'],
    searchTerm: '',
    selectedSpecialization: 'All',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredDoctors = filterDoctors(state.doctors, action.payload, state.selectedSpecialization);
    },
    setSelectedSpecialization: (state, action) => {
      state.selectedSpecialization = action.payload;
      state.filteredDoctors = filterDoctors(state.doctors, state.searchTerm, action.payload);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedSpecialization = 'All';
      state.filteredDoctors = state.doctors;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        state.filteredDoctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch doctors';
      });
  },
});

const filterDoctors = (doctors, searchTerm, specialization) => {
  return doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specialization === 'All' || doctor.specialization === specialization;
    return matchesSearch && matchesSpecialization;
  });
};

export const { setSearchTerm, setSelectedSpecialization, clearFilters } = doctorSlice.actions;
export default doctorSlice.reducer;