import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Lock, User, Key, Building, ArrowBigRight, FolderPen, Mail, Hash } from "lucide-react";
import Layout from "./Layout";
import { AdminContext } from "../context/AdminProvider";

const AddSingleStaff = () => {
    const { addSingleStaff } = useContext(AdminContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [role, setRole] = useState("Staff");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(username, role, email, password, phone, gender);
            await addSingleStaff(username, role, email, password, phone, gender);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center py-24 ">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    {/* Header */}
                    <div className="text-center space-y-2 flex flex-col items-center gap-4">
                        <div className="flex justify-center ">
                            <User className="w-16 h-16 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-blue-900">Add Staff</h1>
                        <p className="text-blue-600 text-sm">We’re Growing! Add a Valuable Staff Member to Our Dedicated Team</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* Username Field */}

                        <div className="relative">
                            <label htmlFor="username" className="sr-only">
                                Role
                            </label>
                            <div className="flex items-center">
                                <User className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="role"
                                    name="role"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Role"
                                    value={"Staff"}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <div className="flex items-center">
                                <FolderPen className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="username" className="sr-only">
                                Email
                            </label>
                            <div className="flex items-center">
                                <Mail className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Gender
                            </label>
                            <div className="flex items-center">
                                <User className="absolute left-3 h-5 w-5 text-blue-500" />
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled selected hidden>
                                        Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Phone Number
                            </label>
                            <div className="flex items-center">
                                <Hash className="absolute left-3 h-5 w-5 text-blue-500" />
                                <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    required
                                    className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                            Add Staff
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AddSingleStaff;
