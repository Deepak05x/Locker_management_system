import React, { useState } from "react";
import { lazy } from "react";
import axios from "axios";

const DashNav = lazy(() => import("./DashNav"));

const AddMultipleLocker = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!file) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:3000/upload-excel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUploadStatus("File uploaded successfully!");
            console.log("Server Response:", response.data);
        } catch (error) {
            setUploadStatus("Error uploading file.");
            console.error("Upload Error:", error);
        }
    };

    return (
        <>
            <DashNav />
            <section className="min-h-screen flex gap-12 flex-col items-center justify-center">
                <a href="/addMultipleLockers.xlsx" download="Lockers.xlsx">
                    <p className="bg-blue px-6 py-2 rounded-sm text-white font-medium">Download Template</p>
                </a>
                <div className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                    <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" className="mb-4" />
                    <button onClick={handleFileUpload}>Upload the file</button>
                </div>
                {uploadStatus && <p>{uploadStatus}</p>}
            </section>
        </>
    );
};

export default AddMultipleLocker;
