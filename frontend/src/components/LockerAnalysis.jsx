import React from "react";
import Layout from "./Layout";
import { LockerContext } from "../context/LockerProvider";
import { useContext } from "react";
import { FaEnvelope, FaGenderless, FaClock, FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";

const LockerAnalysis = () => {
    const { expireIn7Days, expireIn1Day } = useContext(LockerContext);

    let lockers = expireIn7Days?.data;
    let smallLocker = expireIn1Day?.data;

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

    return (
        <Layout>
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <section className="flex flex-col gap-4 items-center justify-between w-full  font-medium">
                    <h1 className="text-3xl font-medium">
                        Lockers Expiring In <span className="text-blue">7 Days</span>
                    </h1>
                    <section className="grid grid-cols-3 items-center justify-between gap-16 py-12">
                        {lockers?.map((item, index) => (
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
                <section className="flex flex-col gap-4 items-center justify-between w-full  font-medium">
                    <h1 className="text-3xl font-medium">
                        Lockers Expiring In <span className="text-blue">Today</span>
                    </h1>
                    <section className="grid grid-cols-3 items-center justify-between gap-16 py-12">
                        {smallLocker?.map((item, index) => (
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
            </section>
        </Layout>
    );
};

export default LockerAnalysis;
