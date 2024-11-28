import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../components/index.js';

function DoctorLogin() {
  const navigate = useNavigate();

  const handleSubmit = (username, password) => {
    // Handle login logic for Doctor (e.g., authentication)
    console.log('Doctor Login Attempt:', { username, password });
    // Navigate to the Doctor Dashboard (or handle failed login)
    navigate('/doctor-dashboard');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 flex justify-center items-center">
      <LoginComponent role="Doctor" onSubmit={handleSubmit} />
    </div>
  );
}

export default DoctorLogin;
