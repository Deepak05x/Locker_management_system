import React, { useState, useContext, useRef, lazy } from "react";
import Layout from "./Layout";
import { AuthContext } from "../context/AuthProvider";
import { User, Key, ArrowRight, Loader, Edit2, X, Hash } from "lucide-react";

const BackButton = lazy(() => import("../components/BackButton"));

const AccountPage = () => {
    const { loginDetails, handleProfileUpdate } = useContext(AuthContext);

    const [username, setUsername] = useState(loginDetails.name || "");
    const [email, setEmail] = useState(loginDetails.email || "");
    const [phone, setPhone] = useState(loginDetails.phoneNumber || "");

    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [close, setClose] = useState(false);
    const [loading, setLoading] = useState(false);

    // Create refs for input fields
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);

    const handleClickUser = () => {
        setIsUsernameEditable((prev) => !prev);
        setClose((prev) => !prev);
        setTimeout(() => usernameRef.current?.focus(), 0);
        usernameRef.current?.select();
    };

    const handleClickEmail = () => {
        setIsEmailEditable((prev) => !prev);
        setClose((prev) => !prev);
        setTimeout(() => emailRef.current?.focus(), 0);
        emailRef.current?.select();
    };

    const handleClickPhone = () => {
        setIsPhoneEditable((prev) => !prev);
        setClose((prev) => !prev);
        setTimeout(() => phoneRef.current?.focus(), 0);
        phoneRef.current?.select();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleProfileUpdate(loginDetails._id, username, email, loginDetails.password, phone);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <User className="w-16 h-16 text-blue-600" />
                        <h1 className="text-3xl font-bold text-blue-900">Edit Your Account Details</h1>
                        <p className="text-blue-600 text-sm">Review and Edit Your Account’s Personal Information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* Username Field */}
                        <div className="relative group">
                            <User className="absolute left-3 top-4 h-5 w-5 text-blue-500" />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                ref={usernameRef}
                                readOnly={!isUsernameEditable}
                                className={`pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    isUsernameEditable ? "bg-white" : "bg-gray-100"
                                }`}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {close ? (
                                <X className="absolute right-3 top-3 h-5 w-5 text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleClickUser} />
                            ) : (
                                <Edit2 className="absolute right-3 top-3 h-5 w-5 text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleClickUser} />
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <Key className="absolute left-3 top-4 h-5 w-5 text-blue-500" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                ref={emailRef}
                                readOnly={!isEmailEditable}
                                className={`pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    isEmailEditable ? "bg-white" : "bg-gray-100"
                                }`}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {close ? (
                                <X className="absolute right-3 top-3 h-5 w-5 text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleClickEmail} />
                            ) : (
                                <Edit2 className="absolute right-3 top-3 h-5 w-5 text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleClickEmail} />
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="relative group">
                            <Hash className="absolute left-3 top-4 h-5 w-5 text-blue-500" />
                            <input
                                id="phone"
                                name="phone"
                                type="number"
                                ref={phoneRef}
                                readOnly={!isPhoneEditable}
                                className={`pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    isPhoneEditable ? "bg-white" : "bg-gray-100"
                                }`}
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {close ? (
                                <X className="absolute right-3 top-3 h-5 w-5 text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleClickPhone} />
                            ) : (
                                <Edit2 className="absolute right-3 top-3 h-5 w-5 text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleClickPhone} />
                            )}
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
                            {loading ? "Updating..." : "Update the Details"}
                        </button>
                        <BackButton />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AccountPage;
