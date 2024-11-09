import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { LayoutDashboard, LogOut } from "lucide-react";

const DashNav = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-blue-900/90 text-white backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo Section (Left Corner) */}
                <div className="flex items-center space-x-3">
                    <img src="/DraconX1.png" alt="SafeLocker Logo" className="h-12 sm:h-10 transition-transform duration-300 hover:scale-110" />
                    <span className="text-xl sm:text-2xl font-bold">DraconX</span>
                </div>

                {/* Navigation Links and User Profile Section (Right Corner) */}
                <div className="flex items-center space-x-6 ml-auto">
                    {/* Dashboard Link */}
                    <Link to="/dashboard" className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md hover:bg-blue-700">
                        <LayoutDashboard className="w-5 h-5 group-hover:text-white" />
                        <span className="hidden md:inline text-sm font-medium">Dashboard</span>
                    </Link>

                    {/* User Profile Picture Link */}
                    <Link to="/profile" className="relative group">
                        <img
                            src={user?.photoURL || "/user-1.png"}
                            alt="User Profile"
                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full cursor-pointer ring-2 ring-blue-400 group-hover:ring-blue-500 transition-all duration-300"
                        />
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="hidden sm:flex items-center space-x-2 bg-blue-700 text-gray-200 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 group"
                        aria-label="Logout"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>

                    {/* Responsive Logout for Smaller Screens */}
                    <button
                        onClick={handleLogout}
                        className="sm:hidden flex items-center space-x-2 bg-blue-700 text-gray-200 px-3 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 group"
                        aria-label="Logout"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
