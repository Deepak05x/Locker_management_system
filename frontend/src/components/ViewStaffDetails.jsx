import React from "react";
import Layout from "./Layout";

const ViewStaffDetails = () => {
    return (
        <Layout>
            <section className="flex flex-col items-center justify-center py-24 ">
                <button className="bg-white text-black font-semibold hover:bg-black hover:text-white transition-all ease-in-out px-4 py-2">Delete Staff</button>
                <section className="flex flex-col items-center justify-between gap-16">
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
                </section>
            </section>
        </Layout>
    );
};

export default ViewStaffDetails;
