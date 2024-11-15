import React, { useState, lazy, useContext } from "react";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";
import { MoveRight, BadgeAlert } from "lucide-react";
import { Link } from "react-router-dom";

const BackButton = lazy(() => import("../components/BackButton"));

const AvailableLockers = () => {
    const { availableLocker } = useContext(LockerContext);

    const [lockerType, setLockerType] = useState("");
    const [gender, setGender] = useState("");

    const handleLockerType = (e) => {
        setLockerType(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await availableLocker(lockerType, gender);
            console.log("Success");
        } catch (error) {
            console.log(error);
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
                            Report An Locker <span>Issue</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="relative">
                            <label htmlFor="lockerType" className="sr-only">
                                Locker Type
                            </label>
                            <select
                                id="lockerType"
                                value={lockerType}
                                onChange={handleLockerType}
                                required
                                className="pl-4 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            >
                                <option value="" disabled hidden>
                                    Type of the locker
                                </option>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label htmlFor="gender" className="sr-only">
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={handleGender}
                                required
                                className="pl-4 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            >
                                <option value="" disabled hidden>
                                    Type of the gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <MoveRight className="h-5 w-5 text-white group-hover:text-blue-300" />
                            </span>
                            Check the availability
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

export default AvailableLockers;
