import React from "react";
import DashNav from "./DashNav";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const Layout = ({ children }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div className="min-h-screen relative bg-gradient-to-b from-blue-100 to-blue-50">
            <DashNav />
            <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className=" absolute top-32 left-10"
            >
                <FaArrowCircleLeft className="text-5xl text-blue rounded-full p-1" />
            </button>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
