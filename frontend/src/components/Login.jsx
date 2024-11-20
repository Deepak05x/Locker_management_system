import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Lock, User, Key, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { login } = useContext(AuthContext);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setLoginError("");
        } catch (err) {
            setLoginError(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                {/* Header */}
                <div className="text-center space-y-2 flex flex-col items-center gap-4">
                    <div className="flex justify-center">
                        <Building className="w-16 h-16 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-blue-900">Locker Wise</h1>
                    <p className="text-blue-600 text-sm">Secure Access to Your Digital Lockers</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Username Field */}
                    <div className="relative">
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <div className="flex items-center">
                            <User className="absolute left-3 h-5 w-5 text-blue-500" />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Username or Email"
                                value={email}
                                onChange={handleEmail}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <div className="flex items-center">
                            <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Password"
                                value={password}
                                onChange={handlePassword}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-center hover:underline text-blue text-sm">
                        <Link to={"/enter"} type="button" className="text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-white group-hover:text-blue-300" />
                        </span>
                        Access Locker System
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500">© 2024 Locker Wise. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
