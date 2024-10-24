import React from "react";
import { PiLockersFill } from "react-icons/pi";

const Navbar = () => {
    return (
        <section className="w-full bg-white drop-shadow-xl text-black px-12 py-6">
            <PiLockersFill className="text-blue text-[3rem]" />
        </section>
    );
};

export default Navbar;
