import { Star, MapPin } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-102">
      <div className="flex items-center p-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-blue-600">{doctor.specialty}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
            <span className="ml-2 text-sm text-gray-600">•</span>
            <span className="ml-2 text-sm text-gray-600">{doctor.experience} exp</span>
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{doctor.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;