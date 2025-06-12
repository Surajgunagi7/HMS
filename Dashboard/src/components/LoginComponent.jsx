import { UserCircle, Lock, Building2 } from 'lucide-react';

const LoginForm = ({ role, onSubmit }) => {
  const roleStyles = {
    Doctor: {
      iconColor: 'text-cyan-600',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700',
      ringColor: 'focus:ring-cyan-500'
    },
    Receptionist: {
      iconColor: 'text-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
      ringColor: 'focus:ring-emerald-500'
    },
    Admin: {
      iconColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      ringColor: 'focus:ring-blue-500'
    }
  };

  const styles = roleStyles[role] || roleStyles.Admin;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      loginId: e.target.loginId.value,
      password: e.target.password.value
    };
    onSubmit(formData);
  };

  return (
    <div className="w-96 shadow-xl backdrop-blur-md bg-white/20 rounded-3xl p-8 relative">
      {/* Decorative circles */}
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"/>
      <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"/>
      
      <div className="flex flex-col items-center mb-8 relative">
        <div className={`p-4 rounded-full bg-white/50 backdrop-blur-md shadow-lg mb-4`}>
          <Building2 className={`w-8 h-8 ${styles.iconColor}`} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{role} Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <UserCircle className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${styles.iconColor}`} />
          <input
            type="text"
            id="loginId"
            name="loginId"
            className={`w-full pl-10 pr-3 py-3 bg-white/50 backdrop-blur-sm border-0
              rounded-lg focus:ring-2 ${styles.ringColor} focus:border-transparent
              transition-all duration-300 placeholder-gray-500`}
            placeholder="LoginId"
            required
          />
        </div>

        <div className="relative group">
          <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${styles.iconColor}`} />
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full pl-10 pr-3 py-3 bg-white/50 backdrop-blur-sm border-0
              rounded-lg focus:ring-2 ${styles.ringColor} focus:border-transparent
              transition-all duration-300 placeholder-gray-500`}
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 ${styles.buttonBg} text-white rounded-lg 
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
            transition-all duration-300 backdrop-blur-sm`}
        >
          Login as {role}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-700">
        Need help? Contact system administrator
      </p>
    </div>
  );
};

export default LoginForm;