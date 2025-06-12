import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddAdmin, UpdateAdmin, RemoveAdmin } from "../../components"; // Import the relevant components

const ManageAdmin = () => {
  const [activeTab, setActiveTab] = useState("add");
  const navigate = useNavigate(); 

  return (
    <div className="p-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Admin</h2>
        <button
          onClick={() => navigate("/admin-dashboard")} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Admin
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "update" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("update")}
        >
          Update Admin
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "remove" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("remove")}
        >
          Remove Admin
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded">
        {activeTab === "add" && <AddAdmin />}
        {activeTab === "update" && <UpdateAdmin />}
        {activeTab === "remove" && <RemoveAdmin />}
      </div>
    </div>
  );
};

export default ManageAdmin