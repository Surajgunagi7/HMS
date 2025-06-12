import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../../components/index.js';
import { useDispatch } from 'react-redux';
import { login as receptionistLogin } from '../../store/authSlice.js';
import { authService } from '../../services/authService.js';

function ReceptionistLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (data) => {
    try {
      const { loginId, password } = data; 
      
      const response = await authService.login(loginId, password, 'receptionist');
      const token  = response?.data?.accessToken;
      const role =  response?.data?.user?.role;

      if (!token || !role) throw new Error("Invalid server response");

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      dispatch(receptionistLogin({role, token}));

      navigate('/receptionist-dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-200 flex justify-center items-center">
      <LoginComponent role="Receptionist" onSubmit={handleSubmit} />
    </div>
  );
}

export default ReceptionistLogin;
