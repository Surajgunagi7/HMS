import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { 
  Home, 
  AdminLogin, 
  DoctorLogin, 
  ReceptionistLogin, 
  AdminDashboard, 
  DoctorDashboard, 
  ManageDoc,
  ManageAdmin,
  ManageReceptionist,
  ReceptionistDashboard,
  Sales,
  ActivityRecords
  
} from "./pages";
import {
  ReceptionistAppointment,
  CreateAppointment,
  RequestedCalls,
  Appointments,
  DoctorProfile,
  PatientManager
} from "./components";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1F2937", // Dark gray background
            color: "#F9FAFB",       // Light text
            borderRadius: "12px",
            padding: "14px 20px",
            fontSize: "0.95rem",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
          },
        success: {
          iconTheme: {
            primary: "#4ade80", // green-400
            secondary: "#f0fdf4", // light green bg
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171", // red-400
            secondary: "#fef2f2", // light red bg
          },
        },  
      }} />
      <Routes>
        {/* Landing/Home page */}
        <Route path="/" element={<Home />} />

        {/* Login Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/receptionist-login" element={<ReceptionistLogin />} />

        {/* Protected Dashboard Pages */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} >
          <Route index element={<Sales />} />
          <Route path="manage-doctors" element={<ManageDoc />} />
          <Route path="manage-admins" element={<ManageAdmin />} />
          <Route path="manage-receptionists" element={<ManageReceptionist />} />
          <Route path="sales" element={<Sales />} />
          <Route path="activity" element={<ActivityRecords />} />
        </Route>
        
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} >
          <Route index element={<Appointments />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
        
        {/* Receptionist Dashboard with Nested Routes */}
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />}>
          <Route index element={<ReceptionistAppointment />} />
          <Route path="manage-appointments" element={<ReceptionistAppointment />} />
          <Route path="create-appointment" element={<CreateAppointment />} />
          <Route path="requested-calls" element={<RequestedCalls />} />
          <Route path="patient-management" element={<PatientManager />} />
        </Route>

        {/* Redirect all unknown routes to home page or login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
