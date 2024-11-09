import React, { useState } from "react";
import { lazy, useContext } from "react";
import { Link } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";

const DashNav = lazy(() => import("./DashNav"));

const AddSingleLocker = () => {
    const { addLocker } = useContext(LockerContext);
    const { isEditable, lockerPrices, toggleEditable, handleInputChange, saveLockerPrice } = useContext(LockerContext);

    const [lockerType, setLockerType] = useState(null);
    const [lockerNumber, setLockerNumber] = useState(null);
    const [lockerCode, setLockerCode] = useState(["", "", "", "", ""]);
    const [lockerPriceThree, setLockerPriceThree] = useState(null);
    const [lockerPriceSix, setLockerPriceSix] = useState(null);
    const [lockerPriceYear, setLockerPriceYear] = useState(null);
    const [gender, setGender] = useState(null);
    const [lockerSerialNumber, setLockerSerialNumber] = useState(null);

    console.log(lockerCode[0], lockerCode[1], lockerCode[2], lockerCode[3], lockerCode[4]);
    const handleLockerType = (e) => {
        setLockerType(e.target.value);
    };

    const handleLockerNumber = (e) => {
        setLockerNumber(e.target.value);
    };

    const handleLockerPriceThree = (e) => {
        setLockerPriceThree(e.target.value);
    };

    const handleLockerPriceSix = (e) => {
        setLockerPriceSix(e.target.value);
    };

    const handleLockerPriceYear = (e) => {
        setLockerPriceYear(e.target.value);
    };

    const handleLockerSerialNumber = (e) => {
        setLockerSerialNumber(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleLockerCode = (index, event) => {
        const newLockerCode = [...lockerCode];
        newLockerCode[index] = event.target.value;
        setLockerCode(newLockerCode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addLocker(lockerType, lockerNumber, lockerCode, lockerPriceThree, lockerPriceSix, lockerPriceYear, gender);
    };

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
        </tr>
    );

    return (
        <Layout>
            <section className="flex flex-col items-center py-24 gap-12">
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
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Want to add a <span className="text-blue">locker?</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <select id="lockerType" value={lockerType} onChange={handleLockerType} className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none">
                                <option value="" disabled selected hidden>
                                    Type of the locker
                                </option>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <select id="gender" value={gender} onChange={handleGender} className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none">
                                <option value="" disabled selected hidden>
                                    Type of the gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input
                                type="number"
                                id="number"
                                value={lockerNumber}
                                placeholder="Enter the locker number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerNumber}
                            />
                            <input
                                type="number"
                                id="number"
                                value={lockerSerialNumber}
                                placeholder="Enter the locker serial number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerSerialNumber}
                            />
                            {Array.from({ length: 5 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    value={lockerCode[index]}
                                    placeholder={`Enter the combination ${index + 1}`}
                                    className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                    onChange={(e) => handleLockerCode(index, e)}
                                />
                            ))}

                            <input
                                type="number"
                                id="3"
                                value={lockerPriceThree}
                                placeholder="Enter the price for 3 months"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerPriceThree}
                            />
                            <input
                                type="number"
                                id="6"
                                value={lockerPriceSix}
                                placeholder="Enter the price for 6 months"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerPriceSix}
                            />
                            <input
                                type="number"
                                id="12"
                                value={lockerPriceYear}
                                placeholder="Enter the price for 12 months"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerPriceYear}
                            />

                            <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Add Locker
                            </button>
                        </div>
                        <Link className="bg-blue px-6 py-2 rounded-sm text-white font-medium" to={"/add_multiple_locker"}>
                            Add Multiple Locker
                        </Link>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default AddSingleLocker;
