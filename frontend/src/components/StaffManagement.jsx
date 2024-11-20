import React from "react";
import { useContext, lazy } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminProvider";
import { FaEnvelope, FaGenderless } from "react-icons/fa";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const BackButton = lazy(() => import("../components/BackButton"));

const StaffManagement = () => {
    const { staffs, handleStaffDetails } = useContext(AdminContext);
    console.log(staffs);

    const navigate = useNavigate();

    const handleViewSubmit = async (id) => {
        try {
            await handleStaffDetails(id);
            console.log("SUBMIT WORKED");
            navigate("/view_staff_details");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditSubmit = async (id) => {
        try {
            await handleStaffDetails(id);
            navigate("/edit_staff_details");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <section className="flex flex-col items-center w-full px-24 py-24 gap-12">
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                        <div className="text-center space-y-2 flex flex-col items-center gap-4">
                            <div className="flex justify-center ">
                                <User className="w-16 h-16 text-blue-600" />
                            </div>
                            <h1 className="text-3xl flex flex-col font-bold text-blue-900">Staff Management</h1>
                        </div>

                        <form className="mt-8 space-y-6 w-full">
                            <Link
                                to={"/add_single_staff"}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Add Staff
                            </Link>
                            <BackButton />
                        </form>
                    </div>
                </div>

                <section className="grid grid-cols-3 items-center w-full justify-center gap-16">
                    {staffs.map((item, index) => (
                        <div key={index} className="flex flex-col max-w-sm items-start bg-white rounded-lg shadow-md p-6 gap-4  border border-gray-300  hover:shadow-lg">
                            {/* Locker Number and Status */}
                            <div className="flex items-center justify-between gap-16 w-full mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <span className={`text-sm font-medium rounded px-2 py-1 bg-gray-200`}>{item.gender}</span>
                            </div>

                            {/* Card Details */}
                            <div className="flex flex-col text-gray-700 text-sm gap-2 w-full">
                                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                                    <FaEnvelope className="text-blue-500 mr-2" />
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-auto">{item.email}</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                                    <FaGenderless className="text-pink-500 mr-2" />
                                    <span className="font-medium">Phone:</span>
                                    <span className="ml-auto">{item.phoneNumber}</span>
                                </div>
                            </div>

                            <div className="flex justify-between w-full mt-4 gap-12">
                                <button type="submit" onClick={() => handleViewSubmit(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                    View
                                </button>
                                <button type="submit" onClick={() => handleEditSubmit(item._id)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default StaffManagement;
