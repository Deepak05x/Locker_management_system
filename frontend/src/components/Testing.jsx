import React from "react";
import { LogIn, Shield, Key, Settings } from "lucide-react";

const Testing = () => {
    return (
        <div className="min-h-screen flex font-sans">
            {/* Left Panel with Logo Background and Overlay */}
            <div className="flex-1 flex flex-col gap-8 items-center justify-center p-10 text-white relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 opacity-90 "></div> {/* Slightly lighter overlay */}
                <div className="relative flex flex-col gap-4 z-10 text-center px-6">
                    <h1 className="text-5xl flex flex-col font-bold leading-tight tracking-tight mb-4 text-shadow">
                        Discover a New Era of Security with <br />
                        <span className="text-yellow-400">Locker Management System</span>
                        <span>by DraconX</span>
                    </h1>
                    <p className="text-ll md:text-xl  mt-4 tracking-wide">Experience smart, secure, and seamlessly integrated locker management designed for modern workspaces.</p>
                </div>
                {/* Call-to-Action Button */}
                <button
                    className="relative z-10 flex items-center px-8 py-4 mt-6 text-xl font-medium bg-white text-blue rounded-lg shadow-lg  transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => console.log("Access System")}
                >
                    <LogIn className="mr-2 h-6 w-6" />
                    Access System
                </button>
            </div>

            {/* Right Panel with Features Section */}
            <div className="flex-1 flex flex-col items-center justify-center bg-white text-blue-800 p-12 space-y-10">
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center tracking-tight">Key Features</h2>

                {/* Carousel of Features */}
                <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
                    {" "}
                    {/* Reduced gap between cards */}
                    <FeatureCard
                        icon={<Shield className="h-12 w-12 text-blue-700 mb-2 animate-bounce" />} // Smaller icon
                        title="Advanced Security"
                        description="State-of-the-art encryption and access control at your fingertips."
                    />
                    <FeatureCard
                        icon={<Key className="h-12 w-12 text-blue-700 mb-2 animate-pulse" />} // Smaller icon
                        title="Smart Access"
                        description="Real-time digital key management with enhanced accessibility."
                    />
                    <FeatureCard
                        icon={<Settings className="h-12 w-12 text-blue-700 mb-2 animate-spin-slow" />} // Smaller icon
                        title="Easy Management"
                        description="Intuitive dashboard for effortless facility administration."
                    />
                </div>
            </div>
        </div>
    );
};

// Feature Card Component for Reusability
const FeatureCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        {" "}
        {/* Reduced padding */}
        {icon}
        <h3 className="text-lg font-semibold mb-1 text-blue-900">{title}</h3> {/* Smaller title font */}
        <p className="text-blue-600 text-center max-w-xs">{description}</p>
    </div>
);

export default Testing;
