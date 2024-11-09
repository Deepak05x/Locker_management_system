import React, { useState } from "react";

import axios from "axios";
import Layout from "./Layout";

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
        <Layout>
            <section className=" flex gap-12 flex-col items-center justify-center py-24">
                <a href="/addMultipleLockers.xlsx" download="Lockers.xlsx">
                    <p className="bg-blue px-6 py-2 rounded-sm text-white font-medium">Download Template</p>
                </a>
                <div className="flex flex-col gap-12 items-center">
                    <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" className=" border border-black" />
                    <button className="bg-blue px-6 py-2 rounded-sm text-white font-medium" onClick={handleFileUpload}>
                        Upload the file
                    </button>
                </div>
                {uploadStatus && <p>{uploadStatus}</p>}
            </section>
        </Layout>
    );
};

export default AddMultipleLocker;
