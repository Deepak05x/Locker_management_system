import React from "react";
import Layout from "./Layout";

const UpdateLockerPrice = () => {
    return (
        <Layout>
            <section className="py-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Update Locker Price</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-4 bg-gray-100">Locker Type</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">3 Months</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">6 Months</th>
                                <th className="border border-gray-300 p-4 bg-gray-100">12 Months</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-4">Half Male</td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-4">Full Male</td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-4">Half Female</td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-4">Full Female</td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <input type="text" className="w-full px-2 py-1 border rounded" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </Layout>
    );
};

export default UpdateLockerPrice;
