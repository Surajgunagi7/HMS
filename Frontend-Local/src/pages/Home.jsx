import { useNavigate } from 'react-router-dom';
import { Users, UserCog, UserCircle, Building2, Heart, Clock, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B5563' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header Section */}
      <div className="bg-blue-600 h-64 w-full relative">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center space-x-3 justify-center">
            <Building2 className="w-10 h-10 text-white" />
            <h1 className="text-3xl font-bold text-white">Hospital Management System</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-32 relative">
        <div className="bg-white rounded-xl shadow-xl p-6 backdrop-blur-sm bg-white/95">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Your Role to Continue</h2>
            <p className="text-gray-600">Access your personalized dashboard based on your role</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Admin Card */}
            <button
              onClick={() => navigate('/admin-login')}
              className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                  <UserCog className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Admin</h3>
                <p className="text-sm text-gray-600 text-center">System administration and management</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500 rounded-xl transition-colors duration-300" />
            </button>

            {/* Doctor Card */}
            <button
              onClick={() => navigate('/doctor-login')}
              className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                  <UserCircle className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Doctor</h3>
                <p className="text-sm text-gray-600 text-center">Patient management and consultations</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500 rounded-xl transition-colors duration-300" />
            </button>

            {/* Receptionist Card */}
            <button
              onClick={() => navigate('/receptionist-login')}
              className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                  <Users className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Receptionist</h3>
                <p className="text-sm text-gray-600 text-center">Appointment scheduling and front desk</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500 rounded-xl transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Features Section instead of simple footer */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pb-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Patient Care</h3>
            <p className="text-sm text-gray-600">Streamlined patient management for better healthcare delivery</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">24/7 Access</h3>
            <p className="text-sm text-gray-600">Round-the-clock access to medical records and resources</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Secure System</h3>
            <p className="text-sm text-gray-600">Advanced security measures to protect sensitive data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;