import React, { useState, useContext, useEffect } from "react";
import { User, Box, RefreshCw, X, Plus, AlertTriangle, Settings, KeyRound } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LockerContext } from "../context/LockerProvider";
import { AdminContext } from "../context/AdminProvider";

const Dashboard = () => {
    const { loginDetails, loginSuccess, setLoginSuccess, updateSuccess, setUpdateSuccess } = useContext(AuthContext);
    const {
        assignSuccess,
        setAssignSuccess,
        cancelSuccess,
        setCancelSuccess,
        technicalSuccess,
        setTechnicalSuccess,
        lockerSuccess,
        setLockerSuccess,
        addSuccess,
        setAddSuccess,
        addMulSuccess,
        setAddMulSuccess,
    } = useContext(LockerContext);
    const { deleteSuccess, setDeleteSuccess, staffSuccess, setStaffSuccess, staffDeleteSuccess, setStaffDeleteSuccess, editStaffSuccess, setEditStaffSuccess } = useContext(AdminContext);

    useEffect(() => {
        if (editStaffSuccess) {
            toast.success("The Staff Details are Updated Successfully");
            setEditStaffSuccess(false);
        }
    }, [editStaffSuccess]);

    useEffect(() => {
        if (loginSuccess) {
            toast.success("Login successful! Welcome to the Dashboard");
            setLoginSuccess(false);
        }
    }, [loginSuccess]);

    useEffect(() => {
        if (staffSuccess) {
            toast.success("The Staff has been Added to the System");
            setStaffSuccess(false);
        }
    }, [staffSuccess]);

    useEffect(() => {
        if (staffDeleteSuccess) {
            toast.success("The Staff has been Deleted Successfully");
            setStaffDeleteSuccess(false);
        }
    }, [staffDeleteSuccess]);

    useEffect(() => {
        if (addMulSuccess) {
            toast.success("Multiple Lockers has been Added to the System");
            setAddMulSuccess(false);
        }
    }, [addMulSuccess]);

    useEffect(() => {
        if (assignSuccess) {
            toast.success("Locker Assignment was done Successfully");
            setAssignSuccess(false);
        }
    }, [assignSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Profile Updated Successfully, Please Login Again to See the Changes");
            setUpdateSuccess(false);
        }
    }, [updateSuccess]);

    useEffect(() => {
        if (cancelSuccess) {
            toast.success("The Locker has been Cancelled Successfully");
            setCancelSuccess(false);
        }
    }, [cancelSuccess]);

    useEffect(() => {
        if (lockerSuccess) {
            toast.success("Locker Issue has been Reported Successfully");
            setLockerSuccess(false);
        }
    }, [lockerSuccess]);

    useEffect(() => {
        if (technicalSuccess) {
            toast.success("Technical Issue has been Reported Successfully");
            setTechnicalSuccess(false);
        }
    }, [technicalSuccess]);

    useEffect(() => {
        if (addSuccess) {
            toast.success("Locker has been added to the System Successfully");
            setAddSuccess(false);
        }
    }, [addSuccess]);

    useEffect(() => {
        if (deleteSuccess) {
            toast.success("Locker has been Deleted Successfully");
            setDeleteSuccess(false);
        }
    }, [deleteSuccess]);

    const staff = [
        { title: "Assign Locker", icon: User, path: "/available_lockers", description: "Assign lockers to the users", stats: "2.4k Users" },
        { title: "Cancel Locker Assignment", icon: Box, path: "/cancel_locker", description: "Oversee staff and their roles", stats: "156 Staff" },
        { title: "Locker Management", icon: KeyRound, path: "/locker_management", description: "View and manage all lockers", stats: "450 Lockers" },
        { title: "Update Locker", icon: RefreshCw, path: "/update_locker", description: "Review all transactions", stats: "1.2k/month" },
        { title: "Issue Reporting", icon: AlertTriangle, path: "/issue_reporting", description: "Report issues with lockers or staff", stats: "5 Active" },
    ];

    const admin = [
        { title: "Locker Analysis", icon: User, path: "/locker_analysis", description: "Analysing the lockers", stats: "2.4k Users" },
        { title: "Staff Management", icon: Box, path: "/staff_management", description: "Oversee staff and their roles", stats: "156 Staff" },
        { title: "Locker Management", icon: KeyRound, path: "/locker_management", description: "View and manage all lockers", stats: "450 Lockers" },
        { title: "Add Locker", icon: Plus, path: "/add_single_locker", description: "Add a new locker to the system", stats: "Quick Add" },
        { title: "Delete Locker", icon: X, path: "/delete_locker", description: "Remove lockers from the system", stats: "Manage" },
        { title: "Update Locker Price", icon: Settings, path: "/update_locker_price", description: "Update existing locker details", stats: "Configure" },
        { title: "Issue Reporting", icon: AlertTriangle, path: "/issue_reporting", description: "Report issues with lockers or staff", stats: "5 Active" },
    ];

    return (
        <Layout>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <main className=" px-4 ssm:px-2 sm:px-4 md:px-6 lg:px-8 xxl:px-10 py-24">
                <div className="grid ssm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4  px-12 gap-12">
                    {loginDetails.role === "Staff" ? (
                        <>
                            {staff.map((feature) => (
                                <Link to={feature.path} key={feature.path}>
                                    <Card className="hover:shadow-lg transition-transform duration-300 cursor-pointer bg-white border border-gray-200 transform hover:-translate-y-1">
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
                                </Link>
                            ))}
                        </>
                    ) : (
                        <>
                            {admin.map((feature) => (
                                <Link to={feature.path} key={feature.path}>
                                    <Card
                                        key={feature.path}
                                        className="hover:shadow-lg transition-transform duration-300 cursor-pointer bg-white border border-gray-200 transform hover:-translate-y-1"
                                    >
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
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            </main>
        </Layout>
    );
};

export default Dashboard;
