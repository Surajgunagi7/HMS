import { useNavigate } from 'react-router-dom';
import {LoginComponent} from '../components/index.js';

function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (username, password) => {
    // Handle login logic (e.g., authentication)
    console.log('Admin Login Attempt:', { username, password });
    // Navigate to the Admin Dashboard (or handle failed login)
    navigate('/admin-dashboard');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-teal-100 to-blue-200 flex justify-center items-center">
      <LoginComponent role="Admin" onSubmit={handleSubmit} />
    </div>
  );
}

export default AdminLogin;
