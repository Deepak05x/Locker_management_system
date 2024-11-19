import React, { useState } from "react";
import Layout from "./Layout";
import { useContext, lazy } from "react";
import { AdminContext } from "../context/AdminProvider";
import { ArrowRight, Loader, BadgeAlert, BookOpen, FolderPen, User, Mail, UserPen } from "lucide-react";

const BackButton = lazy(() => import("../components/BackButton"));

const ViewStaffDetails = () => {
    const { staffDetails, deleteStaff } = useContext(AdminContext);
    const [loading, setLoading] = useState(null);

    const details = staffDetails.user;

    console.log(details);

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteStaff(id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center py-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <BadgeAlert className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl flex flex-col font-bold text-blue-900">
                            Delete A Staff From The<span>Network</span>
                        </h1>
                    </div>

                    <form
                        onSubmit={(e) => {
                            handleSubmit(e, details._id);
                        }}
                        className="mt-8 space-y-6"
                    >
                        <div className="relative">
                            <label htmlFor="subject" className="sr-only">
                                Name
                            </label>
                            <div className="flex items-center">
                                <FolderPen className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    readOnly
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter the subject"
                                    value={details.name}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="description" className="sr-only">
                                Gender
                            </label>
                            <div className="flex items-center">
                                <User className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    readOnly
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your description"
                                    value={details.gender}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="description" className="sr-only">
                                Mail
                            </label>
                            <div className="flex items-center">
                                <Mail className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    readOnly
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your description"
                                    value={details.email}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="description" className="sr-only">
                                Role
                            </label>
                            <div className="flex items-center">
                                <UserPen className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    readOnly
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your description"
                                    value={details.role}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white ${
                                loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {loading ? <Loader className="h-5 w-5 text-white animate-spin" /> : <ArrowRight className="h-5 w-5 text-white group-hover:text-blue-300" />}
                            </span>
                            {loading ? "Deleting..." : "Delete the Staff"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ViewStaffDetails;
