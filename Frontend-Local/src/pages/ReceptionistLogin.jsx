import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../components/index.js';

function ReceptionistLogin() {
  const navigate = useNavigate();

  const handleSubmit = (username, password) => {
    // Handle login logic for Receptionist (e.g., authentication)
    console.log('Receptionist Login Attempt:', { username, password });
    // Navigate to the Receptionist Dashboard (or handle failed login)
    navigate('/receptionist-dashboard');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 flex justify-center items-center">
      <LoginComponent role="Receptionist" onSubmit={handleSubmit} />
    </div>
  );
}

export default ReceptionistLogin;
