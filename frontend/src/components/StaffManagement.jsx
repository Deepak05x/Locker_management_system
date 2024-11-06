import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminProvider";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const StaffManagement = () => {
    const { staffs, handleStaffDetails } = useContext(AdminContext);
    console.log(staffs);

    const navigate = useNavigate();

    const handleSubmit = async (id) => {
        try {
            await handleStaffDetails(id);
            console.log("SUBMIT WORKED");
            navigate("/view_staff_details");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <section className="flex flex-col items-center  w-full px-24 py-24 gap-12">
                <Link to={"/add_single_staff"} className="bg-white text-black font-semibold px-4 py-2 hover:bg-black hover:text-white transition-all ease-in-out">
                    Add Staff
                </Link>
                <section className="grid grid-cols-3 items-center justify-between gap-16">
                    {staffs.map((item, index) => (
                        <div key={index} className="flex flex-col items-start bg-white drop-shadow-xl text-[1rem] px-12 py-8 gap-2">
                            <p className="flex gap-4">
                                <span className="text-blue">Name :</span> {item.name}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Gender :</span> {item.gender}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Email :</span> {item.email}
                            </p>
                            <p className="flex gap-4">
                                <span className="text-blue">Phone Number :</span> {item.phoneNumber}
                            </p>
                            <div className="flex flex-row items-center gap-12 mt-10">
                                <button type="submit" onClick={() => handleSubmit(item._id)} className="bg-blue text-white px-4 py-2">
                                    View Details
                                </button>
                                <button type="submit" onClick={() => handleSubmit(item._id)} className="bg-blue text-white px-4 py-2">
                                    Edit Details
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default StaffManagement;
