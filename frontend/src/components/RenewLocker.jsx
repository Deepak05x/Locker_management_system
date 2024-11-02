import React, { useState } from "react";
import { lazy, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";

const DashNav = lazy(() => import("./DashNav"));

const RenewLocker = () => {
    const location = useLocation();
    const [cost, setCost] = useState(null);
    const [months, setMonths] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    const handleMonths = (e) => {
        setMonths(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRenewLocker(LockerNumber, cost, months, startDate, endDate, employeeEmail);
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
                        Renew the Current <span className="text-blue">Locker</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                type="number"
                                value={LockerNumber}
                                id="number"
                                readOnly
                                placeholder="Locker number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />

                            <input
                                type="text"
                                id="name"
                                readOnly
                                value={employeeName}
                                placeholder="Employee Name"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />

                            <input
                                type="email"
                                value={employeeEmail}
                                id="email"
                                readOnly
                                placeholder="Employee Email"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />

                            <select id="gender" value={months} onChange={handleMonths} className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none">
                                <option value="" disabled selected hidden>
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
                                        <label
                                            htmlFor="startDate"
                                            className="absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out transform -translate-y-1/2"
                                        >
                                            Start date
                                        </label>
                                        <input
                                            onChange={(e) => setStartDate(e.target.value)}
                                            type="date"
                                            id="startDate"
                                            className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none pt-6"
                                        />
                                    </div>

                                    <div className="relative w-full">
                                        <label
                                            htmlFor="startDate"
                                            className="absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out transform -translate-y-1/2"
                                        >
                                            End date
                                        </label>
                                        <input
                                            onChange={(e) => setEndDate(e.target.value)}
                                            type="date"
                                            id="startDate"
                                            className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none pt-6"
                                        />
                                    </div>
                                    <input
                                        type="number"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                        id="cost"
                                        placeholder="Total Cost"
                                        className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                    />
                                </>
                            ) : (
                                <input
                                    type="number"
                                    value={cost}
                                    id="cost"
                                    placeholder="Total Cost"
                                    className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                />
                            )}

                            <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Renew Locker
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default RenewLocker;
