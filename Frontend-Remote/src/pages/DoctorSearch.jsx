import { useState } from 'react';
import { Search } from 'lucide-react';
import {DoctorCard} from '../components';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    experience: "15 years",
    availability: "Mon, Wed, Fri",
    image: "/doctor.svg",
    location: "New York, NY",
    education: "Harvard Medical School"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    rating: 4.9,
    experience: "12 years",
    availability: "Tue, Thu, Sat",
    image: "/doctor.svg",
    location: "Boston, MA",
    education: "Stanford Medical School"
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrics",
    rating: 4.7,
    experience: "10 years",
    availability: "Mon-Fri",
    image: "/doctor.svg",
    location: "Chicago, IL",
    education: "Johns Hopkins University"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    rating: 4.6,
    experience: "20 years",
    availability: "Mon, Wed, Fri",
    image: "/doctor.svg",
    location: "Los Angeles, CA",
    education: "Yale School of Medicine"
  },
  {
    id: 5,
    name: "Dr. Maria Garcia",
    specialty: "Dermatology",
    rating: 4.9,
    experience: "8 years",
    availability: "Tue, Thu",
    image: "/doctor.svg",
    location: "Miami, FL",
    education: "Columbia University"
  },
  {
    id: 6,
    name: "Dr. John Martin",
    specialty: "Cardiology",
    rating: 4.8,
    experience: "18 years",
    availability: "Mon, Thu",
    image: "/doctor.svg",
    location: "Dallas, TX",
    education: "Mayo Clinic College of Medicine"
  },
  {
    id: 7,
    name: "Dr. Olivia Brown",
    specialty: "Neurology",
    rating: 4.7,
    experience: "9 years",
    availability: "Wed, Fri",
    image: "/doctor.svg",
    location: "Seattle, WA",
    education: "University of Washington"
  },
  {
    id: 8,
    name: "Dr. Daniel Robinson",
    specialty: "Pediatrics",
    rating: 4.5,
    experience: "7 years",
    availability: "Mon-Wed",
    image: "/doctor.svg",
    location: "San Francisco, CA",
    education: "UCLA David Geffen School of Medicine"
  },
  {
    id: 9,
    name: "Dr. Sophia Lee",
    specialty: "Orthopedics",
    rating: 4.9,
    experience: "22 years",
    availability: "Tue, Thu",
    image: "/doctor.svg",
    location: "Phoenix, AZ",
    education: "University of Arizona"
  },
  {
    id: 10,
    name: "Dr. Isabella Clark",
    specialty: "Dermatology",
    rating: 4.8,
    experience: "6 years",
    availability: "Mon, Wed",
    image: "/doctor.svg",
    location: "Houston, TX",
    education: "Baylor College of Medicine"
  }
];

export default function DoctorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialty || doctor.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Find a Doctor</h2>
          <p className="mt-2 text-sm text-gray-600">
            Search for specialists and medical professionals
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name..."
              className="pl-10 p-4 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}