import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Hash, Building, ArrowRight, Loader } from "lucide-react";

const EnterOtp = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const { validateOtp, checkEmail } = useContext(AuthContext);

    const handleOtp = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on submit
        try {
            await validateOtp(checkEmail, otp);
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
                    <h1 className="text-3xl font-bold text-blue-900">Enter Your OTP Sent To Your Email</h1>
                    <p className="text-blue-600 text-sm">Secure Access to Your Digital Lockers</p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* OTP Field */}
                    <div className="relative">
                        <label htmlFor="otp" className="sr-only">
                            OTP
                        </label>
                        <div className="flex items-center">
                            <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your OTP"
                                value={otp}
                                onChange={handleOtp}
                            />
                        </div>
                    </div>

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
                        {loading ? "Validating..." : "Submit the OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnterOtp;
