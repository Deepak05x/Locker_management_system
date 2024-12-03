import React from "react";
import { useState } from "react";
import Layout from "./Layout";
import { AdminContext } from "../context/AdminProvider";
import { ShieldCheck, Loader, ArrowRight } from "lucide-react";
import { useContext, lazy } from "react";

const BackButton = lazy(() => import("./BackButton"));

const IssueManagement = () => {
    const [status, setStatus] = useState("Unresolved");
    const [issueType, setIssueType] = useState("locker");
    const [loading, setLoading] = useState(false);

    const { lockerIssue, technicalIssue, deleteIssue } = useContext(AdminContext);

    let filterIssues = lockerIssue;
    if (issueType === "locker") {
        filterIssues = lockerIssue;
    } else if (issueType === "technical") {
        filterIssues = technicalIssue;
    }

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteIssue(id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                        <div className="text-center space-y-2 flex flex-col items-center gap-4">
                            <div className="flex justify-center ">
                                <ShieldCheck className="w-16 h-16 text-blue-600" />
                            </div>
                            <h1 className="text-3xl flex flex-col font-bold text-blue-900">Issue Management</h1>
                        </div>

                        <form className="mt-8 space-y-6 w-full">
                            <div className="flex items-center w-full gap-4">
                                <select
                                    id="filter"
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                    className="border-2 border-black w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none  cursor-pointer"
                                >
                                    <option value="locker">Locker</option>
                                    <option value="technical">Technical</option>
                                </select>
                            </div>
                            <BackButton />
                        </form>
                    </div>
                </div>

                <section className="grid grid-cols-3 items-center justify-between gap-16">
                    {filterIssues?.data?.map((item, index) => (
                        <div key={index} className="flex flex-col  p-8 bg-white shadow-md rounded-md border border-gray-200 gap-4">
                            <div className="flex justify-between items-center mb-4 gap-12">
                                <h2 className="text-xl font-bold">Locker #{item.LockerNumber}</h2>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-md ${status === "Resolved" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{status}</span>
                            </div>
                            <p className="text-[1rem] font-medium text-gray-600 mb-2 flex flex-row gap-2 items-center">
                                <span className="font-bold  text-blue-500">Subject: </span> {item.subject}
                            </p>
                            <p className="text-[1rem] font-medium text-gray-600 mb-4 flex flex-row gap-2 items-center">
                                <span className="font-bold text-blue-500">Description: </span> {item.description}
                            </p>

                            <button
                                type="submit"
                                onClick={() => handleDelete(item._id)}
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-white ${
                                    loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {loading ? <Loader className="h-5 w-5 text-white animate-spin" /> : <ArrowRight className="h-5 w-5 text-white group-hover:text-blue-300" />}
                                </span>
                                {loading ? "Removing..." : "Resolved This Issue"}
                            </button>
                        </div>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default IssueManagement;
