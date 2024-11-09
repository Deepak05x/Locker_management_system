import React from "react";
import { FaEnvelope, FaGenderless, FaClock, FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";

const LockerCard = ({ item }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Allocated":
                return "text-green-700 bg-green-100";
            case "Available":
                return "text-blue-700 bg-blue-100";
            case "Expired":
                return "text-red-700 bg-red-100";
            default:
                return "text-gray-700 bg-gray-100";
        }
    };

    return (
        <div className="flex flex-col items-start bg-white rounded-lg shadow-md p-6 gap-4 max-w-xs border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg">
            {/* Locker Number and Status */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Locker #{item.LockerNumber}</h2>
                <span className={`text-sm font-medium rounded px-2 py-1 ${getStatusColor(item.LockerStatus)}`}>{item.LockerStatus}</span>
            </div>

            {/* Card Details */}
            <div className="flex flex-col text-gray-700 text-sm gap-2">
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <FaEnvelope className="text-blue-500 mr-2" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-auto">{item.employeeEmail}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <FaGenderless className="text-pink-500 mr-2" />
                    <span className="font-medium">Gender:</span>
                    <span className="ml-auto">{item.availableForGender}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <FaClock className="text-yellow-500 mr-2" />
                    <span className="font-medium">Type:</span>
                    <span className="ml-auto">{item.LockerType}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <FaClock className="text-green-500 mr-2" />
                    <span className="font-medium">Duration:</span>
                    <span className="ml-auto">{item.Duration}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <FaUser className="text-purple-500 mr-2" />
                    <span className="font-medium">Name:</span>
                    <span className="ml-auto">{item.employeeName}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <FaPhone className="text-blue-500 mr-2" />
                    <span className="font-medium">Phone:</span>
                    <span className="ml-auto">{item.employeePhone}</span>
                </div>
                <div className="flex items-center justify-between">
                    <FaCalendarAlt className="text-red-500 mr-2" />
                    <span className="font-medium">Expires On:</span>
                    <span className="ml-auto">{item.expiresOn || "Nil"}</span>
                </div>
            </div>
        </div>
    );
};

export default LockerCard;
