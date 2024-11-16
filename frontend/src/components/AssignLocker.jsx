import React, { useState } from "react";
import { lazy, useContext, useEffect } from "react";
import { LockerContext } from "../context/LockerProvider";
import { ArrowRight, Loader, ShieldCheck, User, Hash, Key, ClipboardType, FolderOpen, Mail, CircleDollarSign } from "lucide-react";
import Layout from "./Layout";

const BackButton = lazy(() => import("../components/BackButton"));

const AssignLocker = () => {
    const { availableLockers, allocateLocker } = useContext(LockerContext);

    const [months, setMonths] = useState(null);
    const [empName, setEmpName] = useState(null);
    const [empId, setEmpId] = useState(null);
    const [empEmail, setEmpEmail] = useState(null);
    const [empPhone, setEmpPhone] = useState(null);
    const [cost, setCost] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (months === "3") {
            setCost(availableLockers.data.LockerPrice3Month);
        } else if (months === "6") {
            setCost(availableLockers.data.LockerPrice6Month);
        } else if (months === "12") {
            setCost(availableLockers.data.LockerPrice12Month);
        } else {
            setCost("");
        }
    }, [months]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await allocateLocker(
                availableLockers.data.LockerNumber,
                availableLockers.data.LockerType,
                availableLockers.data.LockerCode,
                empName,
                empId,
                empEmail,
                empPhone,
                availableLockers.data.availableForGender,
                cost,
                months,
                startDate,
                endDate
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <ShieldCheck className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl flex flex-col font-bold text-blue-900">
                            Assign an Locker To <span>Employee</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="relative">
                            <label htmlFor="number" className="sr-only">
                                Number
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the locker number"
                                    value={availableLockers.data.LockerNumber}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Code
                            </label>
                            <div className="flex items-center">
                                <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the subject"
                                    value={availableLockers.data.LockerCode}
                                />
                            </div>
                        </div>

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
                                    placeholder="Enter the locker serial number"
                                    value={availableLockers.data.LockerSerialNumber}
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
                                    placeholder="Enter the subject"
                                    value={availableLockers.data.LockerType}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Gender
                            </label>
                            <div className="flex items-center">
                                <User className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the subject"
                                    value={availableLockers.data.availableForGender}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Name
                            </label>
                            <div className="flex items-center">
                                <FolderOpen className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the employee name"
                                    value={empName}
                                    onChange={(e) => setEmpName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                ID
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the employee ID"
                                    value={empId}
                                    onChange={(e) => setEmpId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Email
                            </label>
                            <div className="flex items-center">
                                <Mail className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the employee email"
                                    value={empEmail}
                                    onChange={(e) => setEmpEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Phone
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the employee phone number"
                                    value={empPhone}
                                    onChange={(e) => setEmpPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <select
                            id="duration"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            <option value="" disabled>
                                Duration
                            </option>
                            <option value="3">3 months</option>
                            <option value="6">6 months</option>
                            <option value="12">12 months</option>
                            <option value="customize">Customize</option>
                        </select>

                        {months === "customize" ? (
                            <>
                                <div className="relative w-full">
                                    <input
                                        id="description"
                                        name="description"
                                        type="date"
                                        required
                                        className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter the start date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="relative w-full">
                                    <input
                                        id="description"
                                        name="description"
                                        type="date"
                                        required
                                        className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter the end date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="subject" className="sr-only">
                                        Cost
                                    </label>
                                    <div className="flex items-center">
                                        <CircleDollarSign className="absolute left-3 h-5 w-5 text-blue-500" />
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Enter the cost"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="relative">
                                <label htmlFor="subject" className="sr-only">
                                    Cost
                                </label>
                                <div className="flex items-center">
                                    <CircleDollarSign className="absolute left-3 h-5 w-5 text-blue-500" />
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter the cost"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

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
                            {loading ? "Assigning..." : "Assign the locker"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AssignLocker;
