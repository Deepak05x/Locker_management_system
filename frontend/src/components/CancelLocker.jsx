import React, { useState } from "react";
import { lazy, useContext } from "react";

import { LockerContext } from "../context/LockerProvider";
import Layout from "./Layout";

const DashNav = lazy(() => import("./DashNav"));

const CancelLocker = () => {
    const { cancelLocker } = useContext(LockerContext);

    const [lockerEmail, setLockerEmail] = useState("");
    const [lockerNumber, setLockerNumber] = useState(null);

    const handleLockerEmail = (e) => {
        setLockerEmail(e.target.value);
    };

    const handleLockerNumber = (e) => {
        setLockerNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await cancelLocker(lockerNumber, lockerEmail);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Cancel the exisiting <span className="text-blue">Locker</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                id="lockerEmail"
                                value={lockerEmail}
                                onChange={handleLockerEmail}
                                placeholder="Enter the locker email"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />
                            <input
                                id="locker_number"
                                value={lockerNumber}
                                onChange={handleLockerNumber}
                                placeholder="Enter the locker number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                            />

                            <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default CancelLocker;
