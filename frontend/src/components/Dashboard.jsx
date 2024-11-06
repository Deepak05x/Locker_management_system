import React, { useState, useContext } from "react";
import { User, Box, RefreshCw, X, Plus, AlertTriangle, Settings, KeyRound } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/Badge";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Dashboard = () => {
    const { loginDetails } = useContext(AuthContext);

    const staff = [
        { title: "Assign Locker", icon: User, path: "/available_lockers", description: "Assign lockers to the users", stats: "2.4k Users" },
        { title: "Cancel Locker Assignment", icon: Box, path: "/cancel_locker", description: "Oversee staff and their roles", stats: "156 Staff" },
        { title: "Locker Management", icon: KeyRound, path: "/locker_management", description: "View and manage all lockers", stats: "450 Lockers" },
        { title: "Update Locker", icon: RefreshCw, path: "/update_locker", description: "Review all transactions", stats: "1.2k/month" },
        { title: "Issue Reporting", icon: AlertTriangle, path: "/issue_reporting", description: "Report issues with lockers or staff", stats: "5 Active" },
    ];

    const admin = [
        { title: "Locker Analysis", icon: User, path: "/locker_analysis", description: "Analysing the lockers", stats: "2.4k Users" },
        { title: "Staff Management", icon: Box, path: "/staff-management", description: "Oversee staff and their roles", stats: "156 Staff" },
        { title: "Locker Management", icon: KeyRound, path: "/locker_management", description: "View and manage all lockers", stats: "450 Lockers" },
        { title: "Transaction History", icon: RefreshCw, path: "/transaction-history", description: "Review all transactions", stats: "1.2k/month" },
        { title: "Add Locker", icon: Plus, path: "/add-locker", description: "Add a new locker to the system", stats: "Quick Add" },
        { title: "Delete Locker", icon: X, path: "/delete-locker", description: "Remove lockers from the system", stats: "Manage" },
        { title: "Update Locker", icon: Settings, path: "/update-locker", description: "Update existing locker details", stats: "Configure" },
        { title: "Issue Reporting", icon: AlertTriangle, path: "/report", description: "Report issues with lockers or staff", stats: "5 Active" },
    ];

    return (
        <Layout>
            <main className=" px-4 ssm:px-2 sm:px-4 md:px-6 lg:px-8 xxl:px-10 py-24">
                <div className="grid  ssm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4  px-12 gap-12">
                    {loginDetails.role === "Staff" ? (
                        <>
                            {staff.map((feature) => (
                                <Link to={feature.path} key={feature.path}>
                                    <Card className="hover:shadow-lg transition-transform duration-300 cursor-pointer bg-white border border-gray-200 transform hover:-translate-y-1">
                                        <CardContent className="">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="bg-blue/10 p-2 md:p-3 rounded-lg">{React.createElement(feature.icon, { className: "h-6 w-6 text-blue" })}</div>
                                                </div>
                                                <div>
                                                    <h2 className="text-md md:text-lg font-semibold text-gray-800">{feature.title}</h2>
                                                    <p className="text-sm md:text-base text-gray-600 mt-1">{feature.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </>
                    ) : (
                        <>
                            {admin.map((feature) => (
                                <Card key={feature.path} className="hover:shadow-lg transition-transform duration-300 cursor-pointer bg-white border border-gray-200 transform hover:-translate-y-1">
                                    <CardContent className="px-6 py-8">
                                        <div className="space-y-4 flex flex-col items-center justify-center text-center">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-blue/10 p-2 md:p-3 rounded-lg">{React.createElement(feature.icon, { className: "h-6 w-6 text-blue" })}</div>
                                            </div>
                                            <div>
                                                <h2 className="text-md md:text-lg font-semibold text-gray-800">{feature.title}</h2>
                                                <p className="text-sm md:text-base text-gray-600 mt-1">{feature.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </div>
            </main>
        </Layout>
    );
};

export default Dashboard;
