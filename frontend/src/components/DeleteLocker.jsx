import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminProvider";
import { Hash, CircleOff, ArrowBigRight } from "lucide-react";
import Layout from "./Layout";

const DeleteLocker = () => {
    const { deleteLocker } = useContext(AdminContext);
    const [lockerNumber, setLockerNumber] = useState(null);

    console.log(lockerNumber);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteLocker(lockerNumber);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center py-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    {/* Header */}
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <CircleOff className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-blue-900">Delete a Locker</h1>
                        <p className="text-blue-600 text-sm">Remove this locker entry to deactivate it and clear its assignment. </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* Username Field */}
                        <div className="relative">
                            <label htmlFor="username" className="sr-only">
                                Locker ID
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="locker_number"
                                    name="locker_number"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the locker Number"
                                    value={lockerNumber}
                                    onChange={(e) => setLockerNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowBigRight className="h-5 w-5 text-white group-hover:text-blue-300" />
                            </span>
                            Remove the locker
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default DeleteLocker;
