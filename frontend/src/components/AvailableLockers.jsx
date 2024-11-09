import React, { useState } from "react";
import { lazy, useContext } from "react";
import { Link } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";

const DashNav = lazy(() => import("./DashNav"));

const AvailableLockers = () => {
    const { availableLocker } = useContext(LockerContext);

    const [lockerType, setLockerType] = useState(null);
    const [gender, setGender] = useState(null);

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
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Check the locker <span className="text-blue">Availability</span>
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
                            <div className="flex flex-col items-center gap-12 justify-between w-full">
                                <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                    Check Availability
                                </button>
                                <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                    back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default AvailableLockers;
