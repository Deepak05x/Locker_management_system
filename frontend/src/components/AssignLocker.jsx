import React, { useState } from "react";
import { lazy, useContext, useEffect } from "react";
import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";

const DashNav = lazy(() => import("./DashNav"));

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
    }, [months, availableLockers.data]);

    const handleMonths = (e) => {
        setMonths(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        allocateLocker(
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
    };

    return (
        <Layout>
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Assign the available <span className="text-blue">Locker</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                type="number"
                                id="number"
                                value={availableLockers.data.LockerNumber}
                                placeholder="Locker number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                type="text"
                                value={availableLockers.data.LockerCode}
                                id="code"
                                placeholder="Locker code"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                type="text"
                                value={availableLockers.data.LockerSerialNumber}
                                id="code"
                                placeholder="Locker code"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                type="text"
                                value={availableLockers.data.LockerType}
                                id="type"
                                placeholder="Locker type"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                value={availableLockers.data.availableForGender}
                                type="text"
                                id="gender"
                                placeholder="Employee Gender"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                onChange={(e) => setEmpName(e.target.value)}
                                type="text"
                                id="name"
                                placeholder="Employee Name"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                onChange={(e) => setEmpId(e.target.value)}
                                type="number"
                                id="id"
                                placeholder="Employee ID"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                onChange={(e) => setEmpEmail(e.target.value)}
                                type="text"
                                id="email"
                                placeholder="Employee Email"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                onChange={(e) => setEmpPhone(e.target.value)}
                                type="number"
                                id="phone"
                                placeholder="Employee Phone"
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
                                Add Locker
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default AssignLocker;
