import React from "react";

export const Button = ({ children, className, onClick, variant = "primary" }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium";
    const variantStyles = variant === "ghost" ? "bg-transparent text-blue-600 hover:bg-blue-100" : "bg-blue-600 text-white hover:bg-blue-700";

    return (
        <button className={`${baseStyles} ${variantStyles} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};
