import React from "react";
import { lazy } from "react";
import { useState } from "react";

const Navbar = lazy(() => import("./components/Navbar"));

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <section>
            <Navbar />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Already have an <span className="text-blue">account?</span>
                    </h1>
                    <form action="" className="w-full">
                        <div className="flex flex-col gap-8 items-center ">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder="Enter your email"
                                className="border border-black px-4 py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleEmail}
                            />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="Enter your password"
                                className="border border-black px-4 py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handlePassword}
                            />
                            <button className="bg-blue px-6 py-2 rounded-lg text-white font-medium">Login</button>
                            <p className="cursor-pointer">Forgot Password</p>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    );
};

export default App;
