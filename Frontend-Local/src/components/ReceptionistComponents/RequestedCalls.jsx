import React, { useState } from "react";

// Dummy data for requested calls
const requestedCallsData = [
  {
    id: "C001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "123-987-6540",
    reason: "Follow-up call",
  },
  {
    id: "C002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "321-654-9870",
    reason: "General Inquiry",
  },
  // Add more requested calls here
];

const RequestedCalls = () => {
  const [calls, setCalls] = useState(requestedCallsData);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6">Requested Calls</h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left border-b">ID</th>
              <th className="px-6 py-4 text-left border-b">Name</th>
              <th className="px-6 py-4 text-left border-b">Email</th>
              <th className="px-6 py-4 text-left border-b">Phone</th>
              <th className="px-6 py-4 text-left border-b">Reason</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{call.id}</td>
                <td className="px-6 py-4 border-b">{call.name}</td>
                <td className="px-6 py-4 border-b">{call.email}</td>
                <td className="px-6 py-4 border-b">{call.phone}</td>
                <td className="px-6 py-4 border-b">{call.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedCalls;
