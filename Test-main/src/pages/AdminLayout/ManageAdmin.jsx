import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Edit, Trash2 } from "lucide-react";
import { AddAdmin, UpdateAdmin, RemoveAdmin } from "../../components";
import { GlassCard, GlassButton } from "../../components/common";

const ManageAdmin = () => {
  const [activeTab, setActiveTab] = useState("add");
  const navigate = useNavigate();

  const tabs = [
    { id: "add", label: "Add Admin", icon: UserPlus, color: "bg-green-500" },
    { id: "update", label: "Update Admin", icon: Edit, color: "bg-blue-500" },
    { id: "remove", label: "Remove Admin", icon: Trash2, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-admin opacity-5"></div>
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <GlassButton
                onClick={() => navigate("/admin-dashboard")}
                variant="secondary"
                className="hover:scale-105 "
              >
                <ArrowLeft size={18} />
                Back to Dashboard
              </GlassButton>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Manage Administrators</h1>
                <p className="text-gray-600 mt-1">Add, update, or remove admin accounts</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <GlassCard className="p-2">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
                    ${activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg scale-105`
                      : 'text-gray-600 hover:bg-gray-100 hover:scale-102'
                    }
                  `}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Content */}
        <div className="animate-fadeInUp animate-stagger-2">
          {activeTab === "add" && <AddAdmin />}
          {activeTab === "update" && <UpdateAdmin />}
          {activeTab === "remove" && <RemoveAdmin />}
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;