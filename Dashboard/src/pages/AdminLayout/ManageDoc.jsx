import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddDoctor, UpdateDoctor, RemoveDoctor } from "../../components";

const ManageDoc = () => {
  const [activeTab, setActiveTab] = useState("add");
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Doctors</h2>
        <button
          onClick={() => navigate("/admin-dashboard")} // Navigate back to Admin Dashboard
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Doctor
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "update" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("update")}
        >
          Update Doctor
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "remove" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("remove")}
        >
          Remove Doctor
        </button>
      </div>

      <div className="bg-white rounded">
        {activeTab === "add" && <AddDoctor />}
        {activeTab === "update" && <UpdateDoctor />}
        {activeTab === "remove" && <RemoveDoctor />}
      </div>
    </div>
  );
};

export default ManageDoc;
