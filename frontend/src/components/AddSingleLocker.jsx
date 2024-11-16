import React, { useState } from "react";
import { lazy, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";
import { ArrowRight, Loader, ShieldCheck, User, Hash, Key, ClipboardType, FolderOpen, Mail, CircleDollarSign } from "lucide-react";
import Layout from "./Layout";
import { toast } from "react-toastify";

const BackButton = lazy(() => import("../components/BackButton"));

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
    const [loading, setLoading] = useState(false);

    console.log(lockerCode[0], lockerCode[1], lockerCode[2], lockerCode[3], lockerCode[4]);
    const handleLockerType = (e) => {
        setLockerType(e.target.value);
    };

    const handleLockerCode = (index, event) => {
        const newLockerCode = [...lockerCode];
        newLockerCode[index] = event.target.value;
        setLockerCode(newLockerCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addLocker(lockerType, lockerNumber, lockerCode, lockerPriceThree, lockerPriceSix, lockerPriceYear, gender, lockerSerialNumber);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <ShieldCheck className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl flex flex-col font-bold text-blue-900">
                            Add a New Locker to the <span>System</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <select id="lockerType" value={lockerType} onChange={handleLockerType} className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none">
                            <option value="" disabled selected hidden>
                                Type of the locker
                            </option>
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                        </select>

                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                        >
                            <option value="" disabled selected hidden>
                                Type of the gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Serial Number
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the locker number"
                                    value={lockerNumber}
                                    onChange={(e) => setLockerNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Type
                            </label>
                            <div className="flex items-center">
                                <ClipboardType className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the locker serial number"
                                    value={lockerSerialNumber}
                                    onChange={(e) => setLockerSerialNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className="relative" key={index}>
                                <label htmlFor={`Code-${index}`} className="sr-only">
                                    Gender
                                </label>
                                <div className="flex items-center">
                                    <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                    <input
                                        id={`code-${index}`}
                                        name="subject"
                                        type="text"
                                        required
                                        className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder={`Enter the Locker Code ${index + 1}`}
                                        value={lockerCode[index]}
                                        onChange={(e) => handleLockerCode(index, e)}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Name
                            </label>
                            <div className="flex items-center">
                                <CircleDollarSign className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the 3 months price"
                                    value={lockerPriceThree}
                                    onChange={(e) => setLockerPriceThree(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                ID
                            </label>
                            <div className="flex items-center">
                                <CircleDollarSign className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the 6 months price"
                                    value={lockerPriceSix}
                                    onChange={(e) => setLockerPriceSix(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Email
                            </label>
                            <div className="flex items-center">
                                <CircleDollarSign className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the 12 months price"
                                    value={lockerPriceYear}
                                    onChange={(e) => setLockerPriceYear(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white ${
                                loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {loading ? <Loader className="h-5 w-5 text-white animate-spin" /> : <ArrowRight className="h-5 w-5 text-white group-hover:text-blue-300" />}
                            </span>
                            {loading ? "Adding..." : "Add the locker"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default AddSingleLocker;
