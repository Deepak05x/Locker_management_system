import React from "react";
import Layout from "./Layout";
import { Key, Building, ArrowRight, Eye, EyeOff, Loader } from "lucide-react";
import { useState, lazy, useContext } from "react";

const BackButton = lazy(() => import("../components/BackButton"));

const AccountResetPass = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPass, setShowOldPass] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPass, setResetPass] = useState("");
    const [confirmReset, setConfirmReset] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center py-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    {/* Header */}
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center">
                            <Building className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-blue-900">Reset Your Password</h1>
                        <p className="text-blue-600 text-sm">Secure Access to Your Digital Lockers</p>
                    </div>

                    {/* Reset Password Form */}
                    <form className="mt-8 space-y-6">
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Old Password
                            </label>
                            <div className="flex items-center">
                                <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="old_password"
                                    name="old_password"
                                    type={showOldPass ? "text" : "password"}
                                    required
                                    className="pl-10 pr-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your old password"
                                    value={oldPass}
                                    onChange={(e) => setOldPass(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowOldPass((prev) => !prev)} className="absolute right-3 h-5 w-5 text-gray-500 focus:outline-none">
                                    {showOldPass ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="flex items-center">
                                <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="pl-10 pr-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your new password"
                                    value={resetPass}
                                    onChange={(e) => setResetPass(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 h-5 w-5 text-gray-500 focus:outline-none">
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <label htmlFor="confirm" className="sr-only">
                                Confirm Password
                            </label>
                            <div className="flex items-center">
                                <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="confirm"
                                    name="confirm"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    className="pl-10 pr-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Confirm your new password"
                                    value={confirmReset}
                                    onChange={(e) => setConfirmReset(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 h-5 w-5 text-gray-500 focus:outline-none">
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading} // Disable button while loading
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white ${
                                loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {loading ? <Loader className="h-5 w-5 text-white animate-spin" /> : <ArrowRight className="h-5 w-5 text-white group-hover:text-blue-300" />}
                            </span>
                            {loading ? "Updating..." : "Update your password"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AccountResetPass;
