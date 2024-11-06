import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminProvider";
import Layout from "./Layout";

const StaffManagement = () => {
    const { staffs } = useContext(AdminContext);
    console.log(staffs);

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
                            <Link to={"/view_staff_details"} className="bg-blue text-white px-4 py-2">
                                View Details
                            </Link>
                        </div>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default StaffManagement;
