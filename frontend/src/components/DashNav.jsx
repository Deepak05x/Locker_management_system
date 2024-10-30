import React from "react";
import { PiLockersFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <section className="w-full bg-white drop-shadow-xl text-black px-12 py-6 flex flex-row justify-between">
            <div>
                <PiLockersFill className="text-blue text-[2.5rem]" />
            </div>
            <div className="flex flex-row items-center gap-8">
                <Link to={"/dashboard"} className="font-medium outline-blue outline rounded-full px-6 py-1 text-lg">
                    Dashboard
                </Link>
                <button onClick={logout} className="bg-blue px-4 py-2 text-white font-medium rounded-sm">
                    Logout
                </button>
                <img src={"/user-1.png"} alt="" width={40} height={40} className="rounded-full " />
            </div>
        </section>
    );
};

export default Navbar;
