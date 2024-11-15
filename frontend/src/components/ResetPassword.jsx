import React, { useState, lazy, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Key, Building, ArrowRight, Eye, EyeOff, Loader } from "lucide-react";

const Navbar = lazy(() => import("./Navbar"));

const ResetPassword = () => {
    const [resetPass, setResetPass] = useState("");
    const [confirmReset, setConfirmReset] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { resetPassword, checkEmail } = useContext(AuthContext);

    const handleResetPassword = (e) => {
        setResetPass(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmReset(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (resetPass !== confirmReset) {
            setError("Passwords do not match!");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await resetPassword(checkEmail, confirmReset);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
                    <h1 className="text-3xl font-bold text-blue-900">Reset Your Password</h1>
                    <p className="text-blue-600 text-sm">Secure Access to Your Digital Lockers</p>
                </div>

                {/* Reset Password Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                                type={showPassword ? "text" : "password"}
                                required
                                className="pl-10 pr-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your password"
                                value={resetPass}
                                onChange={handleResetPassword}
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
                                placeholder="Confirm your password"
                                value={confirmReset}
                                onChange={handleConfirmPassword}
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
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
