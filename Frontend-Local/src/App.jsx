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
  Records,
  ReceptionistDashboard,
} from "./pages";

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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />

        {/* Manage Doctors Page (Under Admin) */}
        <Route path="/admin-dashboard/manage-doctors" element={<ManageDoc />} />
        <Route path="/admin-dashboard/manage-admins" element={<ManageAdmin />} />
        <Route path="/admin-dashboard/manage-receptionists" element={<ManageReceptionist />} />
        <Route path="/admin-dashboard/Reports" element={<Records />} />

        {/* Redirect all unknown routes to home page or login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
