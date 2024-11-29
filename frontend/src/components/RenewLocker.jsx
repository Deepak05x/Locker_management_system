import React, { useState } from "react";
import { lazy, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";
import { ArrowRight, Loader, Hash, Key, CircleDollarSign, ShieldCheck } from "lucide-react";

const BackButton = lazy(() => import("../components/BackButton"));

const RenewLocker = () => {
    const location = useLocation();
    const [cost, setCost] = useState(null);
    const [months, setMonths] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(null);

    const { handleRenewLocker } = useContext(LockerContext);

    const { LockerNumber, employeeName, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, employeeEmail } = location.state || {};

    useEffect(() => {
        if (months === "3") {
            setCost(LockerPrice3Month);
        } else if (months === "6") {
            setCost(LockerPrice6Month);
        } else if (months === "12") {
            setCost(LockerPrice12Month);
        } else {
            setCost("");
        }
    }, [months]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleRenewLocker(LockerNumber, cost, months, startDate, endDate, employeeEmail);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <ShieldCheck className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl flex flex-col font-bold text-blue-900">
                            Renew the Current <span>Locker</span>
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
                                    value={LockerNumber}
                                    readOnly
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
                                    value={employeeName}
                                    readOnly
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
                                    value={employeeEmail}
                                    readOnly
                                />
                            </div>
                        </div>

                        <select
                            id="duration"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            <option value="" disabled selected>
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
                            {loading ? "Renewing..." : "Renew the locker"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default RenewLocker;
