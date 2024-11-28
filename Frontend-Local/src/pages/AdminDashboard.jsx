import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const adminId = 'admin123'; // This could be dynamic

  const handleLogout = () => {
    // Implement logout logic, such as clearing session data
    console.log('Admin logged out');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-teal-600 text-white p-6 flex flex-col">
        {/* Admin Name and ID */}
        <div className="text-left text-2xl font-semibold mb-14 px-4">
          <p>Admin Panel</p>
        </div>

        {/* Sidebar List of Options */}
        <ul className="space-y-6 flex-1">
          <li>
            <button
              onClick={() => navigate('/manage-doctors')}
              className="w-full text-left px-4 py-2 text-lg hover:bg-teal-700 rounded-lg"
            >
              Manage Doctors
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/reports')}
              className="w-full text-left px-4 py-2 text-lg hover:bg-teal-700 rounded-lg"
            >
              Reports
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/manage-admins')}
              className="w-full text-left px-4 py-2 text-lg hover:bg-teal-700 rounded-lg"
            >
              Manage Admins
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/manage-receptionists')}
              className="w-full text-left px-4 py-2 text-lg hover:bg-teal-700 rounded-lg"
            >
              Manage Receptionists
            </button>
          </li>
        </ul>

        {/* Admin ID and Logout Button */}
        <div className="mt-6">
          <div className="text-sm font-semibold mb-2">Admin ID: {adminId}</div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
          <h1 className="text-3xl font-semibold text-teal-600 mb-6">Dashboard Overview</h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl">Total Users</h3>
              <p className="text-xl">120</p>
            </div>
            <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl">Appointments Today</h3>
              <p className="text-xl">30</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl">Pending Reports</h3>
              <p className="text-xl">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
