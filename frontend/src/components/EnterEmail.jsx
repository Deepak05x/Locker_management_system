import React, { useState, useContext } from "react";
import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Key, Building, ArrowRight, Loader } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = lazy(() => import("./Navbar"));

const EnterEmail = () => {
    const navigate = useNavigate();
    const [resetEmail, setResetEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { generateOtp, setCheckEmail } = useContext(AuthContext);

    const handleResetEmail = (e) => {
        setResetEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the button is clicked
        try {
            await generateOtp(resetEmail);
            setCheckEmail(resetEmail);
            navigate("/otp");
            console.log("Success");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Reset loading state
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
                    <h1 className="text-3xl font-bold text-blue-900">Enter Your Registered Email</h1>
                    <p className="text-blue-600 text-sm">Secure Access to Your Digital Lockers</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Email Field */}
                    <div className="relative">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <div className="flex items-center">
                            <User className="absolute left-3 h-5 w-5 text-blue-500" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Email"
                                value={resetEmail}
                                onChange={handleResetEmail}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white ${
                            loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            {loading ? <Loader className="h-5 w-5 text-white animate-spin" /> : <ArrowRight className="h-5 w-5 text-white group-hover:text-blue-300" />}
                        </span>
                        {loading ? "Processing..." : "Request the OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnterEmail;
