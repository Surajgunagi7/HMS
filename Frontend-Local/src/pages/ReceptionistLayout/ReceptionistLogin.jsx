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
        const { username, password } = data; 
        
        const response = await authService.login(username, password, 'receptionist');
        const { token } = response;
        localStorage.setItem('token', token);
        
        dispatch(receptionistLogin({username, role: 'receptionist', token}));
  
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
