import React from "react";
import Layout from "./Layout";
import { useContext } from "react";
import { AdminContext } from "../context/AdminProvider";

const ViewStaffDetails = () => {
    const { staffDetails, deleteStaff } = useContext(AdminContext);

    const details = staffDetails.user;

    console.log(details);

    const handleSubmit = async (id) => {
        try {
            await deleteStaff(id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <section className="flex flex-col items-center justify-center py-24 gap-12">
                <button onClick={() => handleSubmit(details._id)} className="bg-white text-black font-semibold hover:bg-black hover:text-white transition-all ease-in-out px-4 py-2">
                    Delete Staff
                </button>
                <section className="flex flex-col items-center justify-between gap-16">
                    <div className="flex flex-col items-start bg-white drop-shadow-xl text-[1rem] px-12 py-8 gap-2">
                        <p className="flex gap-4">
                            <span className="text-blue">Name :</span> {details.name}
                        </p>
                        <p className="flex gap-4">
                            <span className="text-blue">Gender :</span> {details.gender}
                        </p>
                        <p className="flex gap-4">
                            <span className="text-blue">Email :</span> {details.email}
                        </p>
                        <p className="flex gap-4">
                            <span className="text-blue">Phone Number :</span> {details.phoneNumber}
                        </p>
                    </div>
                </section>
            </section>
        </Layout>
    );
};

export default ViewStaffDetails;
