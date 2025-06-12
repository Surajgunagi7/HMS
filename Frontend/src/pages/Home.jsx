import { Link } from 'react-router-dom';
import {  
  Award, 
  Star,
  ArrowRight,
  Calendar,
  Stethoscope,
  CheckCircle,
  User,
  Heart,
  Shield,
  Clock,
  Users,
  Brain,
  Eye,
  Activity,
  Zap
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Expert Medical Care",
      description: "Our team of experienced doctors provides comprehensive healthcare services with the latest medical technology.",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe & Secure",
      description: "Your health data is protected with industry-leading security measures and complete privacy compliance.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Emergency Care",
      description: "Round-the-clock emergency services with immediate response and critical care when you need it most.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Personalized Treatment",
      description: "Tailored healthcare plans designed specifically for your unique needs and medical history.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Appointments",
      description: "Fast and easy appointment booking with minimal wait times and flexible scheduling options.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Advanced Technology",
      description: "State-of-the-art medical equipment and cutting-edge diagnostic tools for accurate results.",
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50"
    }
  ];

  const specialties = [
    {
      icon: <Heart className="h-8 w-8" />,
      name: "Cardiology",
      description: "Heart and cardiovascular care",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      name: "Neurology",
      description: "Brain and nervous system",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      name: "Ophthalmology",
      description: "Eye care and vision",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      name: "Pediatrics",
      description: "Children's healthcare",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      comment: "The care I received was exceptional. The doctors were thorough and the staff was incredibly supportive throughout my treatment.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael Chen",
      role: "Patient",
      comment: "Quick appointment booking and professional service. The liquid glass interface makes everything so smooth and modern.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      comment: "Outstanding medical care with a personal touch. The doctors really listen and provide comprehensive treatment plans.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 liquid-glass-blue rounded-full text-sm font-medium text-blue-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Trusted by 10,000+ Patients
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Your Health is Our
                <span className="gradient-text block">
                  Priority
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience world-class healthcare with our team of expert doctors and 
                state-of-the-art facilities. We're here for you 24/7 with personalized care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointment"
                  className="btn-liquid text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Appointment</span>
                </Link>
                <Link
                  to="/doctors"
                  className="btn-liquid-secondary px-8 py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold"
                >
                  <User className="h-5 w-5" />
                  <span>Meet Our Doctors</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Hospital"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 liquid-glass-popup p-6 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Trusted Care</p>
                      <p className="text-sm text-gray-600">10,000+ Happy Patients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 liquid-glass-blue rounded-full text-sm font-medium mb-6 text-blue-700">
              <Award className="h-4 w-4 mr-2" />
              Why Choose MediCare
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Experience the Future of
              <span className="gradient-text block">
                Healthcare
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge medical technology with compassionate care to provide you with an unparalleled healthcare experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative card-liquid"
              >
                <div className="liquid-glass-blue rounded-2xl p-8 h-full smooth-hover">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 smooth-transition group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 smooth-transition">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Specialties Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 liquid-glass-blue rounded-full text-sm font-medium mb-6 text-blue-700">
              <Stethoscope className="h-4 w-4 mr-2" />
              Medical Specialties
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Care Across
              <span className="gradient-text block">
                Multiple Specialties
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expert physicians provide specialized care across various medical fields with state-of-the-art facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="group relative card-liquid"
              >
                <div className="liquid-glass rounded-2xl p-8 text-center smooth-hover h-full">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${specialty.gradient} text-white mb-6 smooth-transition group-hover:scale-110`}>
                    {specialty.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 smooth-transition">
                    {specialty.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {specialty.description}
                  </p>
                  <Link
                    to="/doctors"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium smooth-transition"
                  >
                    <span>View Doctors</span>
                    <ArrowRight className="h-4 w-4 ml-1 smooth-transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 liquid-glass-blue rounded-full text-sm font-medium mb-6 text-blue-700">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Patient Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Patients
              <span className="gradient-text block">
                Say About Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our patients have to say about their experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group card-liquid"
              >
                <div className="liquid-glass-blue rounded-2xl p-8 h-full smooth-hover">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover mr-4 ring-2 ring-white/50"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience
              <span className="block">Better Healthcare?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book your appointment today and take the first step towards better health with our expert medical team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/appointment"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-gray-100 smooth-transition font-bold flex items-center justify-center space-x-3 shadow-xl"
              >
                <Calendar className="h-6 w-6" />
                <span>Book Appointment Now</span>
              </Link>
              <Link
                to="/doctors"
                className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-blue-600 smooth-transition font-bold flex items-center justify-center space-x-3"
              >
                <User className="h-6 w-6" />
                <span>Meet Our Doctors</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;