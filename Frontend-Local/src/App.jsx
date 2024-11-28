import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { 
  Home, 
  AdminLogin, 
  DoctorLogin, 
  ReceptionistLogin, 
  AdminDashboard, 
  DoctorDashboard 
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
        <Route path="/admin-dashboard"element={ <AdminDashboard /> } />
        <Route path="/doctor-dashboard"element={ <DoctorDashboard /> } />

        {/* Redirect all unknown routes to home page or login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
