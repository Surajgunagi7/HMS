import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PhoneIcon, Search, Star, Clock, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-500">
      <div className="pt-16 pb-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl hover:scale-105 transition-transform">
              Welcome to <span className="text-blue-600">HMS</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your health is our priority. Book appointments and find the right doctor with ease.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Link
                to="/appointment"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all hover:shadow-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              <Link
                to="/doctors"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all hover:shadow-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Doctor
              </Link>
              <Link
                to="/request-call"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all hover:shadow-lg"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                Request a Call
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Star className="h-8 w-8 text-blue-600" />,
                title: "Expert Doctors",
                description: "Access to highly qualified medical professionals across various specialties."
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "24/7 Support",
                description: "Round-the-clock assistance for all your medical needs and queries."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Easy Booking",
                description: "Schedule appointments quickly and efficiently with our online system."
              }
            ].map((card, index) => (
              <div 
                key={card.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="text-xl font-semibold text-gray-800 ml-2">{card.title}</h3>
                </div>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Patients Served" },
              { number: "100+", label: "Expert Doctors" },
              { number: "50+", label: "Specialties" },
              { number: "95%", label: "Satisfaction Rate" }
            ].map((stat) => (
              <div key={stat.label} className="bg-blue-600 text-white p-6 rounded-lg transform hover:scale-105 transition-all">
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}