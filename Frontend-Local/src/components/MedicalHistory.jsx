import React, { useState, useEffect } from "react";

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching medical history data
    const fetchHistory = async () => {
      setLoading(true);
      // Simulated data (replace with API call in the future)
      const data = [
        {
          id: 1,
          patientName: "John Doe",
          date: "2024-11-10",
          details: "Follow-up for hypertension. Prescribed medication.",
        },
        {
          id: 2,
          patientName: "Jane Smith",
          date: "2024-11-15",
          details: "Annual health check-up. No major issues found.",
        },
      ];
      setTimeout(() => {
        setHistory(data);
        setLoading(false);
      }, 1000); // Simulating delay
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading medical history...</p>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Medical History</h2>
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((record) => (
            <div key={record.id} className="p-4 border rounded shadow-md">
              <p>
                <strong>Patient:</strong> {record.patientName}
              </p>
              <p>
                <strong>Date:</strong> {record.date}
              </p>
              <p>
                <strong>Details:</strong> {record.details}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No medical history records found.</p>
      )}
    </div>
  );
};

export default MedicalHistory;
