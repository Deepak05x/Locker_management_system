import React from "react";
import { lazy } from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = lazy(() => import("./Navbar"));

const EnterOtp = () => {
    const [otp, setOtp] = useState("");

    const { checkOtp } = useContext(AuthContext);

    const handleOtp = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkOtp(otp);
    };

    return (
        <>
            <Navbar />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Enter your verification <span className="text-blue">code</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                type="email"
                                id="email"
                                value={otp}
                                placeholder="Enter your code"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleOtp}
                            />

                            <Link to={"/reset"} className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Submit OTP
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default EnterOtp;
