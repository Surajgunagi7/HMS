import React, { useState } from "react";

const RemoveAdmin = () => {
  const [searchId, setSearchId] = useState("");

  const handleRemove = () => {
    console.log("Removing Admin with ID: ", searchId);
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter Admin ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
        >
          Remove Admin
        </button>
      </div>
    </div>
  );
};

export default RemoveAdmin;
