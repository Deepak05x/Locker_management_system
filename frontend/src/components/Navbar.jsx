import React from "react";
import { PiLockersFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <section className="w-full bg-white drop-shadow-xl text-black px-12 py-6">
            <Link to="/">
                <PiLockersFill className="text-blue text-[2.5rem]" />
            </Link>
        </section>
    );
};

export default Navbar;
