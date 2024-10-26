import React from "react";
import { lazy } from "react";
import { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = lazy(() => import("./Navbar"));

const EnterEmail = () => {
    const navigate = useNavigate();
    const [resetEmail, setResetEmail] = useState("");

    const { generateOtp, setCheckEmail } = useContext(AuthContext);

    const handleResetEmail = (e) => {
        setResetEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await generateOtp(resetEmail);
            setCheckEmail(resetEmail);
            navigate("/otp");
            console.log("Success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Enter your registered <span className="text-blue">email</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                type="email"
                                id="email"
                                value={resetEmail}
                                placeholder="Enter your email"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleResetEmail}
                            />

                            <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Send OTP
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default EnterEmail;
