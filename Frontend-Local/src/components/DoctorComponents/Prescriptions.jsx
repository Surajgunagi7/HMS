/* eslint-disable react/display-name */
import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import { 
  User, 
  PlusCircle, 
  Pill, 
  Clock, 
  FileText, 
  Calendar,
  Search
} from "lucide-react";

const Prescriptions = () => {
  const [search, setSearch] = useState("");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      patientName: "",
      medication: "",
      dosage: "",
      instructions: "",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const dummyPrescriptions = [
    {
      id: 1,
      patientName: "John Smith",
      medication: "Amoxicillin",
      dosage: "500mg twice daily",
      instructions: "Take with food",
      date: "2025-01-05"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      medication: "Lisinopril",
      dosage: "10mg once daily",
      instructions: "Take in the morning",
      date: "2025-01-06"
    }
  ];

  const onSubmit = (data) => {
    console.log("New Prescription:", data);
    reset();
    
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notificationDiv.textContent = 'Prescription logged successfully!';
    document.body.appendChild(notificationDiv);
    setTimeout(() => document.body.removeChild(notificationDiv), 3000);
  };

  const filteredPrescriptions = dummyPrescriptions.filter(
    prescription => prescription.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const CustomInput = React.forwardRef(({ icon: Icon, ...props }, ref) => (
    <div className="relative mb-4">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </div>
      <input
        {...props}
        ref={ref}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
      />
    </div>
  ));

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">New Prescription</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            icon={User}
            type="text"
            placeholder="Patient Name"
            {...register("patientName")}
          />
          <CustomInput
            icon={Pill}
            type="text"
            placeholder="Medication"
            {...register("medication")}
          />
          <CustomInput
            icon={Clock}
            type="text"
            placeholder="Dosage (e.g., 1 tablet twice a day)"
            {...register("dosage")}
          />
          <CustomInput
            icon={Calendar}
            type="date"
            {...register("date")}
          />
        </div>
        
        <div className="relative mb-4">
          <div className="absolute left-3 top-3 text-gray-400">
            <FileText size={18} />
          </div>
          <textarea
            placeholder="Additional Instructions"
            {...register("instructions")}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusCircle size={18} />
          Add Prescription
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Prescription History</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredPrescriptions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No prescriptions found.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <div className="flex items-center mb-3">
                    <User size={16} className="text-gray-400 mr-2" />
                    <h4 className="font-semibold text-gray-800">
                      {prescription.patientName}
                    </h4>
                    <span className="ml-auto text-sm text-gray-500">
                      {prescription.date}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="flex items-center mb-2">
                        <Pill size={14} className="mr-2" />
                        <strong className="mr-2">Medication:</strong> 
                        {prescription.medication}
                      </p>
                      <p className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        <strong className="mr-2">Dosage:</strong> 
                        {prescription.dosage}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-start">
                        <FileText size={14} className="mr-2 mt-1" />
                        <span>
                          <strong className="mr-2">Instructions:</strong>
                          {prescription.instructions}
                        </span>
                      </p>
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

export default Prescriptions;