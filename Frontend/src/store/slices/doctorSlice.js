import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock doctors data
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience: '15 years',
    availability: 'Available Today',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    consultationFee: '$150'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'ENT',
    experience: '12 years',
    availability: 'Available Tomorrow',
    image: 'https://images.pexels.com/photos/6812502/pexels-photo-6812502.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    consultationFee: '$120'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    experience: '10 years',
    availability: 'Available Today',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    consultationFee: '$130'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: '18 years',
    availability: 'Available Monday',
    image: 'https://images.pexels.com/photos/6812511/pexels-photo-6812511.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    consultationFee: '$160'
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialization: 'Pediatrics',
    experience: '14 years',
    availability: 'Available Today',
    image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    consultationFee: '$110'
  },
  {
    id: 6,
    name: 'Dr. Robert Kumar',
    specialization: 'Neurology',
    experience: '20 years',
    availability: 'Available Tuesday',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    consultationFee: '$180'
  }
];

// Async thunk for fetching doctors
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockDoctors;
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

// Helper function to filter doctors
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