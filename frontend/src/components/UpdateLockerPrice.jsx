import React, { useContext } from "react";
import { LockerContext } from "../context/LockerProvider";
import { AuthContext } from "../context/AuthProvider";
import Layout from "./Layout";

const UpdateLockerPrice = () => {
    const { isEditable, lockerPrices, toggleEditable, handleInputChange, saveLockerPrice } = useContext(LockerContext);
    const { halfFemalePrice } = useContext(AuthContext);

    const renderLockerRow = (lockerType, lockerLabel, lockerGender) => (
        <tr className="bg-white hover:bg-blue-50 transition-colors">
            <td className="border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 text-center text-gray-700 text-sm sm:text-base">{lockerGender}</td>
            <td className="border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 text-center text-gray-700 text-sm sm:text-base">{lockerLabel}</td>
            {["threeMonths", "sixMonths", "twelveMonths"].map((duration) => (
                <td key={duration} className="border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4">
                    <input
                        type="text"
                        className={`w-full px-2 sm:px-2 py-1 sm:py-2 text-sm sm:text-base text-gray-700 border rounded-lg outline-none focus:ring-2 ${
                            isEditable[lockerType] ? "border-blue-500 focus:ring-blue-500" : "border-gray-300 bg-gray-100 cursor-not-allowed"
                        }`}
                        value={lockerPrices[lockerType][duration]}
                        readOnly={!isEditable[lockerType]}
                        onChange={(e) => handleInputChange(e, lockerType, duration)}
                    />
                </td>
            ))}
            <td className="border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 text-center">
                <button
                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base ${
                        isEditable[lockerType] ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition-colors`}
                    onClick={() => {
                        if (isEditable[lockerType]) {
                            saveLockerPrice(lockerType);
                        }
                        toggleEditable(lockerType);
                    }}
                >
                    {isEditable[lockerType] ? "Save" : "Customize"}
                </button>
            </td>
        </tr>
    );

    return (
        <Layout>
            <section className="py-16 sm:py-24 px-6 bg-gradient-to-b from-blue-100 to-blue-50">
                <div className="max-w-5xl mx-auto px-4 sm:p-6 bg-white rounded-2xl shadow-xl flex flex-col gap-6 sm:gap-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">Update Locker Price</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm sm:text-base border-blue-500">
                            <thead className="text-blue-500">
                                <tr>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">Gender</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">Type</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">3 Months</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">6 Months</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">12 Months</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">Customize</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderLockerRow("halfMale", "Half", "Male")}
                                {renderLockerRow("fullMale", "Full", "Male")}
                                {renderLockerRow("halfFemale", "Half", "Female")}
                                {renderLockerRow("fullFemale", "Full", "Female")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default UpdateLockerPrice;
