import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-r from-teal-100 to-blue-200 flex justify-center items-center">
      <div className="w-4/5 h-4/5 px-8 py-12 bg-white shadow-lg rounded-xl space-y-8">
        <h1 className="text-4xl font-semibold text-teal-600 text-center">
          Welcome to the Hospital Management System
        </h1>
        <p className="text-gray-600 text-lg text-center">
          Simplify patient management, appointments, and records.<br /> Please select your role to log in.
        </p>

        <div className="flex flex-row items-center justify-center space-x-10 space-y-0 p-12 pb-28">
          <button
            onClick={() => navigate('/admin-login')}
            className="w-full py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none transition duration-300"
          >
            Admin Login
          </button>
          <button
            onClick={() => navigate('/doctor-login')}
            className="w-full py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 focus:outline-none transition duration-300"
          >
            Doctor Login
          </button>
          <button
            onClick={() => navigate('/receptionist-login')}
            className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 focus:outline-none transition duration-300"
          >
            Receptionist Login
          </button>
        </div>

        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Hospital Management System | All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
