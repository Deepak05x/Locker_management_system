import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { ShieldCheck } from "lucide-react";
import { lazy, useContext } from "react";
import { LockerContext } from "../context/LockerProvider";

const BackButton = lazy(() => import("../components/BackButton"));

const UpdateLocker = () => {
    const { expiredLockerDetails } = useContext(LockerContext);

    console.log(expiredLockerDetails);

    return (
        <Layout>
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                        <div className="text-center space-y-2 flex flex-col items-center gap-4">
                            <div className="flex justify-center ">
                                <ShieldCheck className="w-16 h-16 text-blue-600" />
                            </div>
                            <h1 className="text-3xl flex flex-col font-bold text-blue-900">Update The Lockers</h1>
                        </div>
                        <div className="mt-8 space-y-6 w-full">
                            <BackButton />
                        </div>
                    </div>
                </div>

                <section className="grid grid-cols-3 items-center justify-between gap-16">
                    {expiredLockerDetails.map((item, index) => (
                        <div key={index} className="flex flex-col items-start bg-white shadow-lg rounded-lg text-[1rem] px-8 py-6 gap-4 border border-gray-200 ">
                            <p className="flex gap-4 items-center">
                                <span className="text-blue-500 font-medium flex items-center">
                                    <i className="fas fa-lock mr-2"></i> Number:
                                </span>
                                {item.LockerNumber}
                            </p>
                            <p className="flex gap-4 items-center">
                                <span className="text-blue-500 font-medium flex items-center">
                                    <i className="fas fa-envelope mr-2"></i> Email:
                                </span>
                                {item.employeeEmail}
                            </p>
                            <p className="flex gap-4 items-center">
                                <span className="text-blue-500 font-medium flex items-center">
                                    <i className="fas fa-venus-mars mr-2"></i> Gender:
                                </span>
                                {item.availableForGender}
                            </p>
                            <p className="flex gap-4 items-center">
                                <span className="text-blue-500 font-medium flex items-center">
                                    <i className="fas fa-venus-mars mr-2"></i> Type:
                                </span>
                                {item.LockerType}
                            </p>
                            <p className="flex gap-4 items-center">
                                <span className="text-blue-500 font-medium flex items-center">
                                    <i className="fas fa-user mr-2"></i> Name:
                                </span>
                                {item.employeeName}
                            </p>
                            <p className="flex gap-4 items-center">
                                <span className="text-blue-500 font-medium flex items-center">
                                    <i className="fas fa-phone mr-2"></i> Phone:
                                </span>
                                {item.employeePhone}
                            </p>
                            <div className="flex flex-row gap-4 mt-4">
                                <Link
                                    to={"/update_locker_feature"}
                                    state={{ LockerNumber: item.LockerNumber, employeeEmail: item.employeeEmail }}
                                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200"
                                >
                                    Update
                                </Link>
                                <Link
                                    to={"/renew_locker"}
                                    state={{
                                        LockerNumber: item.LockerNumber,
                                        LockerPrice3Month: item.LockerPrice3Month,
                                        LockerPrice6Month: item.LockerPrice6Month,
                                        LockerPrice12Month: item.LockerPrice12Month,
                                        employeeEmail: item.employeeEmail,
                                        employeeName: item.employeeName,
                                    }}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 hover:shadow-lg transition duration-200"
                                >
                                    Renew
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default UpdateLocker;
