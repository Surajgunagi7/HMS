import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../../components/index.js';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/authService.js';
import { login as doctorLogin } from '../../store/authSlice.js';

function DoctorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (data) => {
    try {
      const { loginId, password } = data; 
      
      const response = await authService.login(loginId, password, 'doctor');
      const token  = response?.data?.accessToken;
      const role =  response?.data?.user?.role;

      if (!token || !role) throw new Error("Invalid server response");

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
        
      dispatch(doctorLogin({role, token}));

      navigate('/doctor-dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <div className="h-screen w-full bg-gradient-to-r from-cyan-50 via-cyan-100 to-cyan-200 flex justify-center items-center">
      <LoginComponent role="Doctor" onSubmit={handleSubmit} />
    </div>
  );
}

export default DoctorLogin;
