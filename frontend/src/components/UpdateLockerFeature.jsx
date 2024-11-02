import React, { useState } from "react";
import { lazy, useContext } from "react";
import { useLocation } from "react-router-dom";

import { LockerContext } from "../context/LockerProvider";

const DashNav = lazy(() => import("./DashNav"));

const UpdateLockerFeature = () => {
    const { cancelLocker } = useContext(LockerContext);

    const location = useLocation();
    const { LockerNumber, employeeEmail } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await cancelLocker(LockerNumber, employeeEmail);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <DashNav />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Update the selected <span className="text-blue">Locker</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                id="lockerEmail"
                                value={employeeEmail}
                                placeholder="Enter the locker email"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                id="locker_number"
                                value={LockerNumber}
                                placeholder="Enter the locker number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />

                            <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default UpdateLockerFeature;