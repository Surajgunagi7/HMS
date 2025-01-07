import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  SearchPatient,
  RequestedCalls,
  Appointments,
  DoctorProfile,
  Prescriptions
} from "./components";

function App() {
  return (
    <Router>
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
          <Route path="prescriptions" element={<Prescriptions />} />
        </Route>
        
        {/* Receptionist Dashboard with Nested Routes */}
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />}>
          <Route index element={<ReceptionistAppointment />} />
          <Route path="manage-appointments" element={<ReceptionistAppointment />} />
          <Route path="create-appointment" element={<CreateAppointment />} />
          <Route path="search-patient" element={<SearchPatient />} />
          <Route path="requested-calls" element={<RequestedCalls />} />
        </Route>

    

        {/* Redirect all unknown routes to home page or login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
