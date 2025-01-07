import { useState } from "react";
import { Search, Clock, Check, X, User, Calendar } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patientName: "John Doe", 
      time: "10:00 AM", 
      date: "2025-01-07",
      status: "Cancelled",
      type: "Check-up"
    },
    { 
      id: 2, 
      patientName: "Jane Smith", 
      time: "11:30 AM",
      date: "2025-01-07", 
      status: "Pending",
      type: "Follow-up"
    },
    { 
      id: 3, 
      patientName: "Alice Brown", 
      time: "2:00 PM",
      date: "2025-01-07", 
      status: "Confirmed",
      type: "Consultation"
    },
    { 
      id: 4, 
      patientName: "Kattnis Everdeen", 
      time: "2:00 PM",
      date: "2025-01-07", 
      status: "Pending",
      type: "Consultation"
    },
  ]);

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
    
    const message = `Appointment ${newStatus.toLowerCase()} successfully!`;
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notificationDiv.textContent = message;
    document.body.appendChild(notificationDiv);
    setTimeout(() => document.body.removeChild(notificationDiv), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Today&apos;s Appointments
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64
                       focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No appointments found.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 
                           transition-all duration-200 shadow-sm hover:shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User size={16} className="text-gray-400 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          {appointment.patientName}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {appointment.time}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleStatusChange(appointment.id, "Confirmed")}
                        disabled={appointment.status !== "Pending"}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg
                                 text-green-700 bg-green-50 hover:bg-green-100
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                      >
                        <Check size={16} className="mr-1" />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                        disabled={appointment.status !== "Pending"}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg
                                 text-red-700 bg-red-50 hover:bg-red-100
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;  