import React from "react";
import { LogIn, Shield, Key, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 ">
            <main className="max-w-4xl w-full text-center space-y-16">
                {/* Hero Section */}
                <div className="space-y-6 ">
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-900">Locker Management System</h1>
                    <p className="text-xl text-blue-600">Secure, Smart, Simple</p>
                </div>

                {/* Login Button */}
                <Link
                    to={"/login"}
                    className="group inline-flex items-center justify-center px-8 py-4 text-xl font-semibold text-black bg-blue-600 rounded-lg transform transition-all duration-200 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg"
                >
                    <button className="text-white" onClick={() => console.log("Login clicked")}>
                        Login
                    </button>
                </Link>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Advanced Security</h3>
                        <p className="text-blue-600">State-of-the-art encryption and access control systems</p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <Key className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Smart Access</h3>
                        <p className="text-blue-600">Digital key management with real-time monitoring</p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <Settings className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Easy Management</h3>
                        <p className="text-blue-600">Intuitive dashboard for effortless locker administration</p>
                    </div>
                </div>

                {/* About DevForge Section */}
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm mt-16">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">About DevForge</h2>
                    <p className="text-blue-700 mb-6">
                        DevForge specializes in creating cutting-edge locker management solutions that combine security, efficiency, and user-friendly design. Our systems are trusted by educational
                        institutions, corporations, and facilities worldwide.
                    </p>
                    <div className="text-blue-600 font-medium">Transforming facility management through innovative technology since 2020</div>
                </div>

                {/* Footer */}
                <footer className="text-sm text-blue-500 mt-8">© 2024 DevForge. All rights reserved.</footer>
            </main>
        </div>
    );
};

export default Home;
