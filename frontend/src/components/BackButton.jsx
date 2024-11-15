import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            onClick={() => navigate(-1)}
        >
            Back
        </button>
    );
};

export default BackButton;
