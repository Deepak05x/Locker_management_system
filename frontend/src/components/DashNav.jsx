import React from "react";
import { PiLockersFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <section className="w-full bg-white drop-shadow-xl text-black px-12 py-6 flex flex-row justify-between">
            <Link to="/">
                <PiLockersFill className="text-blue text-[2.5rem]" />
            </Link>
            <div className="flex flex-row items-center gap-8">
                <Link to={"/dashboard"} className="font-bold text-lg">
                    Dashboard
                </Link>
                <button className="bg-blue px-4 py-2 text-white font-medium rounded-sm">Logout</button>
                <img src={"/user-1.png"} alt="" width={40} height={40} className="rounded-full " />
            </div>
        </section>
    );
};

export default Navbar;
