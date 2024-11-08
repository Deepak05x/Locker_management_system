import React, { useContext, useState } from "react";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";

const UpdateLockerPrice = () => {
    const { isEditable, lockerPrices, toggleEditable, handleInputChange, saveLockerPrice } = useContext(LockerContext);

    const renderLockerRow = (lockerType, lockerLabel) => (
        <tr>
            <td className="border border-gray-300 p-4">{lockerLabel}</td>
            {["threeMonths", "sixMonths", "twelveMonths"].map((duration) => (
                <td key={duration} className="border border-gray-300 p-4">
                    <input
                        type="text"
                        className="w-full px-2 py-1 border rounded"
                        value={lockerPrices[lockerType][duration]}
                        readOnly={!isEditable[lockerType]}
                        onChange={(e) => handleInputChange(e, lockerType, duration)}
                    />
                </td>
            ))}
            <td className="border border-gray-300 p-4 text-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
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
            <section className="py-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Update Locker Price</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-4 bg-gray-100">Locker Type</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">3 Months</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">6 Months</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">12 Months</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">Customize</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLockerRow("halfMale", "Half Male")}
                            {renderLockerRow("fullMale", "Full Male")}
                            {renderLockerRow("halfFemale", "Half Female")}
                            {renderLockerRow("fullFemale", "Full Female")}
                        </tbody>
                    </table>
                </div>
            </section>
        </Layout>
    );
};

export default UpdateLockerPrice;
