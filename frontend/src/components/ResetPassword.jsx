import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { lazy } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = lazy(() => import("./Navbar"));

const ResetPassword = () => {
    const [resetPassword, setResetPassword] = useState("");
    const [confirmReset, setConfirmReset] = useState("");

    const { resetPass } = useContext(AuthContext);

    const handleResetPassword = (e) => {
        setResetPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmReset(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPass(resetPassword, confirmReset);
    };

    return (
        <>
            <Navbar />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Enter your new <span className="text-blue">password</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                type="password"
                                id="password"
                                value={resetPassword}
                                placeholder="Enter your password"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleResetPassword}
                            />
                            <input
                                type="password"
                                id="password"
                                value={confirmReset}
                                placeholder="Confirm your password"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleConfirmPassword}
                            />
                            <button className="bg-blue px-6 py-2 rounded-sm text-white font-medium">Reset</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;
