import React from "react";
import { lazy, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const DashNav = lazy(() => import("../components/DashNav"));

const Dashboard = () => {
    const { loginDetails } = useContext(AuthContext);

    return (
        <>
            <DashNav />
            <section className="flex flex-col items-center py-24 ">
                <h1 className="text-3xl font-medium">
                    Welcome <span className="text-blue">{loginDetails.role}</span>
                </h1>
                <div className="flex py-24">
                    {loginDetails.role === "Admin" ? (
                        <section className="grid grid-cols-3 items-center justify-between gap-16 text-lg">
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Locker Management</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">User Management</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Locker Analysis</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Staff Management</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Transaction History</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Add Locker</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Delete Locker</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Customize Locker Price</button>
                            <button className="bg-blue text-white font-medium px-6 py-2 rounded-sm">Expired Locker</button>
                        </section>
                    ) : (
                        <p>Staffff</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Dashboard;
