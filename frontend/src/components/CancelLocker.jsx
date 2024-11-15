import React, { useState } from "react";
import { lazy, useContext } from "react";
import { MoveRight, Hash, BadgeAlert, Mail, ArrowRight, Loader } from "lucide-react";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const BackButton = lazy(() => import("../components/BackButton"));

const CancelLocker = () => {
    const { cancelLocker } = useContext(LockerContext);

    const [lockerEmail, setLockerEmail] = useState("");
    const [lockerNumber, setLockerNumber] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLockerEmail = (e) => {
        setLockerEmail(e.target.value);
    };

    const handleLockerNumber = (e) => {
        setLockerNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        try {
            await cancelLocker(lockerNumber, lockerEmail);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Reset loading state after the submission is complete
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <BadgeAlert className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl flex flex-col font-bold text-blue-900">
                            Cancel A Locker <span>Assignment</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <div className="flex items-center">
                                <Mail className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the locker email"
                                    value={lockerEmail}
                                    onChange={handleLockerEmail}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="number" className="sr-only">
                                Locker Number
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="number"
                                    name="number"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the locker number"
                                    value={lockerNumber}
                                    onChange={handleLockerNumber}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
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
                            {loading ? "Cancelling..." : "Cancel the locker"}
                        </button>
                        <BackButton />
                    </form>

                    <div className="mt-6 text-center">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                Need to Raise Technical Issue?{" "}
                                <Link to={"/technical_issue"} className="text-blue hover:underline cursor-pointer">
                                    Technical Issue
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CancelLocker;
