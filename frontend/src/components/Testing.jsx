import React from "react";
import { Lock, User, Key, Building } from "lucide-react";
import { useState } from "react";

const Testing = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login attempted:", credentials);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-blue p-8 rounded-2xl shadow-xl">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        <Building className="w-16 h-16 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-blue-900">Locker Management System</h1>
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
                                className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Username or Email"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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
                                className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <button type="button" className="text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                        </span>
                        Access Locker System
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Need assistance? Contact your system administrator</p>
                        <p className="text-xs text-gray-500">© 2024 Locker Management System. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testing;
