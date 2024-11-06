import React from "react";
import DashNav from "./DashNav"; // Adjust path as necessary

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
            <DashNav />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
