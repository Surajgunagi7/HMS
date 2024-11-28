import { useState } from 'react';

function LoginForm({ role, onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Define dynamic styles based on role
  const roleColors = {
    Doctor: {
      bgColor: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      focusColor: 'focus:ring-purple-500',
      ringColor: 'focus:ring-purple-500',
    },
    Receptionist: {
      bgColor: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      focusColor: 'focus:ring-pink-500',
      ringColor: 'focus:ring-pink-500',
    },
    Admin: {
      bgColor: 'bg-teal-600',
      hoverColor: 'hover:bg-teal-700',
      focusColor: 'focus:ring-teal-500',
      ringColor: 'focus:ring-teal-500',
    },
  };

  const colors = roleColors[role] || roleColors.Admin; // Default to Admin if no match

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password); // Pass the values to the parent
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8`}>
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">
        {role} Login
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 py-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 py-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 ${colors.bgColor} text-white rounded-lg shadow-lg ${colors.hoverColor} ${colors.focusColor} focus:outline-none transition duration-300`}
        >
          {role} Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
