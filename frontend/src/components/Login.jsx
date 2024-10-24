import React from "react";
import { lazy } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = lazy(() => import("./Navbar"));

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <Navbar />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Already have an <span className="text-blue">account?</span>
                    </h1>
                    <form action="" className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder="Enter your email"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleEmail}
                            />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="Enter your password"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handlePassword}
                            />
                            <button className="bg-blue px-6 py-2 rounded-sm text-white font-medium">Login</button>
                        </div>
                        <div className="flex flex-col items-center gap-8">
                            <p className="cursor-pointer">Forgot Password</p>
                            <p className="flex flex-row gap-2 items-center">
                                Don't have an account?
                                <Link to={"/signup"} className="text-blue cursor-pointer">
                                    Sign-up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;