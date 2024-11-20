import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { LayoutDashboard, LogOut } from "lucide-react";

const DashNav = () => {
    const { logout, loginDetails } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="flex flex-row items-center justify-between w-full  bg-blue-900/90 text-white backdrop-blur-md shadow-md">
            <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo Section (Left Corner) */}
                <div className="flex items-center space-x-3">
                    <img src="/dashboard_img.png" alt="SafeLocker Logo" className="h-12 sm:h-10 transition-transform duration-300 hover:scale-110" />
                    <span className="text-xl sm:text-2xl font-bold">LockerWise</span>
                </div>

                {/* Navigation Links and User Profile Section (Right Corner) */}
                <div className="flex items-center space-x-6 ml-auto">
                    {/* Dashboard Link */}
                    <Link
                        to="/dashboard"
                        className="group flex items-center space-x-2 text-white bg-green-600 hover:bg-green-500 hover:text-white transition-colors duration-300 px-4 py-2 rounded-md shadow-lg hover:shadow-xl"
                    >
                        <LayoutDashboard className="w-5 h-5 text-white group-hover:rotate-6" />
                        <span className="hidden md:inline text-sm font-medium">Dashboard</span>
                    </Link>

                    {/* User Profile Picture Link */}
                    <Link to="/account_page" className="relative group">
                        {loginDetails.role === "Admin" ? (
                            <div className="bg-white text-black px-4 py-2 rounded-full font-bold hover:text-white hover:bg-black">A</div>
                        ) : (
                            <div className="bg-white text-black px-4 py-2 rounded-full font-bold hover:text-white hover:bg-black">S</div>
                        )}
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="hidden sm:flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-500 hover:shadow-xl transition-colors duration-300 group"
                        aria-label="Logout"
                    >
                        <LogOut className="w-5 h-5 text-white group-hover:rotate-6 transition-transform" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
