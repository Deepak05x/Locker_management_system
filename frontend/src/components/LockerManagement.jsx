import React, { useState } from "react";
import { lazy, useContext } from "react";
import { Link } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";

const DashNav = lazy(() => import("./DashNav"));

const LockerManagement = () => {
    const { allLockerDetails, allocatedLockerDetails, availableLockerDetails, expiredLockerDetails } = useContext(LockerContext);

    const [locker, setLocker] = useState(null);

    let filteredLockers;
    if (locker === "all") {
        filteredLockers = allLockerDetails;
    } else if (locker === "expired") {
        filteredLockers = expiredLockerDetails;
    } else if (locker === "allocated") {
        filteredLockers = allocatedLockerDetails;
    } else if (locker === "available") {
        filteredLockers = availableLockerDetails;
    }

    console.log(availableLockerDetails);

    return (
        <>
            <DashNav />
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <section className="flex flex-col gap-4 items-center justify-between w-full  font-medium">
                    <h1 className="text-3xl font-medium">
                        View all <span className="text-blue">lockers</span>
                    </h1>
                    <select name="" id="" value={locker} onChange={(e) => setLocker(e.target.value)} className="border-2 border-black px-2 py-1">
                        <option value="all">All Lockers</option>
                        <option value="expired"> Expired</option>
                        <option value="available">Available</option>
                        <option value="allocated">Allocated</option>
                    </select>
                </section>
                <section className="grid grid-cols-3 items-center justify-between gap-16">
                    {filteredLockers.map((item, index) => (
                        <div key={index} className="flex flex-col items-start bg-white drop-shadow-xl text-[1rem] px-12 py-8 gap-2">
                            <p className="flex gap-4">
                                <span className="text-blue">Status :</span> {item.LockerStatus}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Number :</span> {item.LockerNumber}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Email :</span> {item.employeeEmail}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Gender :</span> {item.availableForGender}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Duration :</span> {item.Duration}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Name :</span> {item.employeeName}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Phone :</span> {item.employeePhone}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Expires On :</span> {item?.expiresOn || "Nil"}
                            </p>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
};

export default LockerManagement;
