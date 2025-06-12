import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginComponent'; 
import { useDispatch } from 'react-redux';
import {login as adminLogin } from '../../store/authSlice'
import {authService} from '../../services/authService'


function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (data) => {
    try {
      const { loginId, password } = data; 
      
      const response = await authService.login(loginId, password, 'admin');
      
      const token  = response?.data?.accessToken;
      const role =  response?.data?.user?.role;

      if (!token || !role) throw new Error("Invalid server response");

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      
      dispatch(adminLogin({role, token}));
      navigate('/admin-dashboard');

    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex justify-center items-center">
      <LoginForm role="Admin" onSubmit={handleSubmit} />
    </div>
  );
}

export default AdminLogin;
