import React, { useState } from "react";
import { lazy, useContext } from "react";

import { LockerContext } from "../context/LockerProvider";

const DashNav = lazy(() => import("./DashNav"));

const UpdateLocker = () => {
    const { expiredLockerDetails } = useContext(LockerContext);

    return (
        <>
            <DashNav />
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <section className="flex flex-col gap-4 items-center justify-between w-full  font-medium">
                    <h1 className="text-3xl font-medium">
                        Expired <span className="text-blue">Lockers</span>
                    </h1>
                </section>
                <section className="grid grid-cols-3 items-center justify-between gap-16">
                    {expiredLockerDetails.map((item, index) => (
                        <div key={index} className="flex flex-col items-start bg-white drop-shadow-xl text-[1rem] px-12 py-8 gap-2">
                            <p className="flex gap-4">
                                <span className="text-blue">Number :</span>
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Email :</span>
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Gender :</span>
                            </p>

                            <p className="flex gap-4">
                                <span className="text-blue">Name :</span>
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Phone :</span>
                            </p>
                            <div className="flex flex-row gap-4 mt-4">
                                <button className="bg-blue px-4 py-2 text-white">Update</button>
                                <button className="bg-blue px-4 py-2 text-white">Renew</button>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
};

export default UpdateLocker;
