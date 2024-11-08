import React from "react";
import Layout from "./Layout";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Lock, User, Key, Building, ArrowBigRight } from "lucide-react";

const AccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginDetails } = useContext(AuthContext);

    console.log(loginDetails);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Layout>
            <div className=" flex flex-col items-center justify-center p-24">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    {/* Header */}
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <User className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-blue-900">Edit Your Account Details</h1>
                        <p className="text-blue-600 text-sm">Review and Edit Your Account’s Personal Information</p>
                    </div>

                    {/* Login Form */}
                    <form className="mt-8 space-y-6">
                        <div className="relative">
                            <label htmlFor="username" className="sr-only">
                                ID
                            </label>
                            <div className="flex items-center">
                                <User className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="id"
                                    name="id"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="ID"
                                    value={loginDetails._id}
                                    readOnly
                                />
                            </div>
                        </div>

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
                                    placeholder="Username"
                                    value={loginDetails.name}
                                    onChange={handleEmail}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                email
                            </label>
                            <div className="flex items-center">
                                <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Email"
                                    value={loginDetails.email}
                                    onChange={handlePassword}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Phone
                            </label>
                            <div className="flex items-center">
                                <Key className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Phone"
                                    value={loginDetails.phoneNumber}
                                    onChange={handlePassword}
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowBigRight className="h-5 w-5 text-white group-hover:text-blue-300" />
                            </span>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AccountPage;
