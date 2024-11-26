import React from "react";
import { useState } from "react";

const IssueManagement = () => {
    const [status, setStatus] = useState("Unresolved");

    const handleResolve = () => {
        setStatus("Resolved");
    };

    return (
        <div className="max-w-sm p-4 bg-white shadow-md rounded-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Locker #1</h2>
                <span className={`px-3 py-1 text-sm font-semibold rounded-md ${status === "Resolved" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{status}</span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Subject: </span> Locker not working
            </p>
            <p className="text-sm font-medium text-gray-600 mb-4">
                <span className="font-bold text-gray-800">Description: </span> The locker is stuck and won't open properly.
            </p>
            =
            {status === "Unresolved" ? (
                <button onClick={handleResolve} className="mt-6 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200">
                    Resolve
                </button>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default IssueManagement;
