import React, { useState } from "react";
import { lazy, useContext } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import { ArrowRight, Loader, Hash, ShieldCheck } from "lucide-react";
import { LockerContext } from "../context/LockerProvider";

const BackButton = lazy(() => import("../components/BackButton"));

const UpdateLockerFeature = () => {
    const { cancelLocker } = useContext(LockerContext);

    const location = useLocation();
    const { LockerNumber, employeeEmail } = location.state || {};

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        s;
        setLoading(true);
        try {
            await cancelLocker(LockerNumber, employeeEmail);
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
                            Update the Current <span>Locker</span>
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                            {loading ? "Updating..." : "Update the locker"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default UpdateLockerFeature;
