import React from "react";
import { lazy, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const DashNav = lazy(() => import("../components/DashNav"));

const adminDashboard = [
    {
        name: "Locker Management",
        link: "/locker_management",
    },
    {
        name: "Staff Management",
        link: "/locker_management",
    },
    {
        name: "Locker Analysis",
        link: "/locker_management",
    },
    {
        name: "Transaction History",
        link: "/locker_management",
    },
    {
        name: "Add Locker",
        link: "/add_single_locker",
    },
    {
        name: "Delete Locker",
        link: "/locker_management",
    },
    {
        name: "Customize Locker Price",
        link: "/locker_management",
    },
    {
        name: "Expired Locker",
        link: "/locker_management",
    },
];

const staffDashboard = [
    {
        name: "Locker Management",
        link: "/locker_management",
    },
    {
        name: "Assign Locker",
        link: "/available_lockers",
    },

    {
        name: "Cancel Locker Assignment",
        link: "/cancel_locker",
    },
    {
        name: "Update Locker",
        link: "/update_locker",
    },
    {
        name: "Issue Reporting",
        link: "/locker_management",
    },
];

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
                    {loginDetails.role === "Admin" && (
                        <section className="grid grid-cols-3 items-center justify-between gap-16 text-lg">
                            {adminDashboard.map((item, index) => (
                                <Link key={index} to={item.link} className="bg-blue text-center text-white font-medium px-6 py-2 rounded-sm">
                                    {item.name}
                                </Link>
                            ))}
                        </section>
                    )}
                    {loginDetails.role === "Staff" && (
                        <section className="grid grid-cols-3 items-center justify-between gap-16 text-lg">
                            {staffDashboard.map((item, index) => (
                                <Link key={index} to={item.link} className="bg-blue text-center text-white font-medium px-6 py-2 rounded-sm">
                                    {item.name}
                                </Link>
                            ))}
                        </section>
                    )}
                </div>
            </section>
        </>
    );
};

export default Dashboard;
