import React, { useState } from "react";
import { lazy, useContext } from "react";
import { Link } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";
import { FaEnvelope, FaGenderless, FaClock, FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";
import Layout from "./Layout";

const BackButton = lazy(() => import("./BackButton"));

const LockerManagement = () => {
    const { allLockerDetails, allocatedLockerDetails, availableLockerDetails, expiredLockerDetails } = useContext(LockerContext);

    const [locker, setLocker] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case "occupied":
                return "text-green-700 bg-green-100";
            case "available":
                return "text-blue-700 bg-blue-100";
            case "expired":
                return "text-red-700 bg-red-100";
            default:
                return "text-gray-700 bg-gray-100";
        }
    };
    let filteredLockers = allLockerDetails;
    if (locker === "expired") {
        filteredLockers = expiredLockerDetails;
    } else if (locker === "allocated") {
        filteredLockers = allocatedLockerDetails;
    } else if (locker === "available") {
        filteredLockers = availableLockerDetails;
    }

    console.log(filteredLockers);

    return (
        <Layout>
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                        <div className="text-center space-y-2 flex flex-col items-center gap-4">
                            <div className="flex justify-center ">
                                <ShieldCheck className="w-16 h-16 text-blue-600" />
                            </div>
                            <h1 className="text-3xl flex flex-col font-bold text-blue-900">Locker Management</h1>
                        </div>

                        <form className="mt-8 space-y-6 w-full">
                            <div className="flex items-center w-full gap-4">
                                <select
                                    id="filter"
                                    value={locker}
                                    onChange={(e) => setLocker(e.target.value)}
                                    className="border-2 border-black w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none  cursor-pointer"
                                >
                                    <option value="all">All Lockers</option>
                                    <option value="expired">Expired</option>
                                    <option value="available">Available</option>
                                    <option value="allocated">Allocated</option>
                                </select>
                            </div>
                            <BackButton />
                        </form>
                    </div>
                </div>

                <section className="grid grid-cols-3 items-center justify-between gap-16">
                    {filteredLockers.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start bg-white rounded-lg shadow-md p-6 gap-4 max-w-xs border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            {/* Locker Number and Status */}
                            <div className="flex items-center justify-between gap-16 w-full mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Locker #{item.LockerNumber}</h2>
                                <span className={`text-sm font-medium rounded px-2 py-1 ${getStatusColor(item.LockerStatus)}`}>{item.LockerStatus}</span>
                            </div>

                            {/* Card Details */}
                            <div className="flex flex-col text-gray-700 text-sm gap-2 w-full">
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
                                    <span className="ml-auto">{item.expiresOn ? new Date(item.expiresOn).toISOString().split("T")[0] : "Nil"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default LockerManagement;
