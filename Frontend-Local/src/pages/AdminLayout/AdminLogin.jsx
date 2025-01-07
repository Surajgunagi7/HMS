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
      const { username, password } = data; 
      
      const response = await authService.login(username, password, 'admin');
      const { token } = response;
      localStorage.setItem('token', token);
      
      dispatch(adminLogin({username,role: 'admin', token}));

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
