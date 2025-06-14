import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../../components/index.js';
import { useDispatch } from 'react-redux';
import { login as receptionistLogin } from '../../store/authSlice.js';
import { authService } from '../../services/authService.js';
import toast from 'react-hot-toast';

function ReceptionistLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      const { loginId, password } = data; 
      
      const response = await authService.login(loginId, password, 'receptionist');
      const token = response?.data?.accessToken;
      const role = response?.data?.user?.role;

      if (!token || !role) throw new Error("Invalid server response");

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      dispatch(receptionistLogin({ role, token }));
      toast.success('Welcome back, Receptionist!');
      navigate('/receptionist-dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-receptionist">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <LoginComponent role="Receptionist" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default ReceptionistLogin;