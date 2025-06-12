import { useNavigate } from 'react-router-dom';
import { Users, UserCog, UserCircle, Building2, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/common';

const Home = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Admin",
      description: "System administration and management",
      icon: UserCog,
      path: "/admin-login",
      gradient: "gradient-admin",
      delay: "animate-stagger-1"
    },
    {
      title: "Doctor", 
      description: "Patient management and consultations",
      icon: UserCircle,
      path: "/doctor-login",
      gradient: "gradient-doctor",
      delay: "animate-stagger-2"
    },
    {
      title: "Receptionist",
      description: "Appointment scheduling and front desk",
      icon: Users,
      path: "/receptionist-login", 
      gradient: "gradient-receptionist",
      delay: "animate-stagger-3"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-admin">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-4 glass rounded-2xl animate-pulse-glow ">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Hospital Management
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-xl text-white/90">System</span>
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
            </div>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Access your personalized dashboard based on your role
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {roles.map((role) => (
            <GlassCard 
              key={role.title}
              className={`text-center cursor-pointer group animate-fadeInUp ${role.delay}`}
            >
              <div className="relative" onClick={() => navigate(role.path)}>
                <div className={`w-20 h-20 ${role.gradient} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{role.title}</h3>
                <p className="text-gray-600 leading-relaxed">{role.description}</p>
                
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 animate-fadeInUp animate-stagger-4">
          <p className="text-white/70">
            © 2024 Hospital Management System. Secure • Reliable • Professional
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;