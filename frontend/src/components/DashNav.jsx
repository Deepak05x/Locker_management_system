import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { LayoutDashboard, LogOut } from "lucide-react";

const DashNav = () => {
    const { logout, loginDetails } = useContext(AuthContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
        console.log(open);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="flex flex-row items-center justify-between w-full  bg-blue-900/90 text-white backdrop-blur-md shadow-md">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo Section (Left Corner) */}
                <div className="flex items-center space-x-3 h-full">
                    <img src="/newNew.png" alt="SafeLocker Logo" className="h-[3rem] w-[3rem] transition-transform duration-300 hover:scale-110" />
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
                    <div className="relative cursor-pointer">
                        {loginDetails.role === "Admin" ? (
                            <>
                                <div onClick={handleOpen} className="bg-white text-black px-4 py-2 rounded-full font-bold hover:text-white hover:bg-black">
                                    A
                                </div>
                                {open && (
                                    <div className="absolute right-0 top-[4rem] w-auto bg-black text-white rounded-lg shadow-lg z-50 flex flex-row items-center justify-center">
                                        <Link to="/account_page" className="rounded-lg px-4 py-2 hover:bg-gray-500 transition-colors duration-200">
                                            Profile
                                        </Link>
                                        <Link to="/account_reset_pass" className="rounded-lg px-4 py-2 hover:bg-gray-500 transition-colors duration-200">
                                            Reset&nbsp;Password
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div onClick={handleOpen} className="bg-white text-black px-4 py-2 rounded-full font-bold hover:text-white hover:bg-black">
                                    S
                                </div>
                                {open && (
                                    <div className="absolute right-0 top-[4rem] w-auto bg-black text-white rounded-lg shadow-lg z-50 flex flex-row items-center justify-center">
                                        <Link to="/account_page" className="rounded-lg px-4 py-2 hover:bg-gray-500 transition-colors duration-200">
                                            Profile
                                        </Link>
                                        <Link to="/account_reset_pass" className="rounded-lg px-4 py-2 hover:bg-gray-500 transition-colors duration-200">
                                            Reset&nbsp;Password
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

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
