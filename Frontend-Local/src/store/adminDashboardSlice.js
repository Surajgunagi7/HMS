import { createSlice } from '@reduxjs/toolkit';

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    stats: [
      { title: 'Total Patients', value: 1863 },
      { title: 'Reports', value: 863 },
      { title: 'Surgeries', value: 163 },
    ],
    chartsData: {
      lineChartData: [
        { name: 'Jan', positive: 400, negative: 240 },
        { name: 'Feb', positive: 300, negative: 139 },
        { name: 'Mar', positive: 200, negative: 980 },
        { name: 'Apr', positive: 278, negative: 390 },
        { name: 'May', positive: 189, negative: 480 },
        { name: 'Jun', positive: 239, negative: 380 },
        { name: 'Jul', positive: 349, negative: 430 },
      ],
      pieChartData: [
        { name: 'Cardiology', value: 40 },
        { name: 'Neurology', value: 20 },
        { name: 'Dermatology', value: 30 },
      ]
    },
  },
  reducers: {},
});

export default adminDashboardSlice.reducer;
