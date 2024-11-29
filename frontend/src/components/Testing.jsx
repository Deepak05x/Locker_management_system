import React from "react";

const expiredLockerDetails = [
    {
        LockerNumber: "L101",
        employeeEmail: "john.doe@example.com",
        availableForGender: "Male",
        employeeName: "John Doe",
        employeePhone: "123-456-7890",
        LockerPrice3Month: 100,
        LockerPrice6Month: 180,
        LockerPrice12Month: 300,
    },
    {
        LockerNumber: "L102",
        employeeEmail: "jane.doe@example.com",
        availableForGender: "Female",
        employeeName: "Jane Doe",
        employeePhone: "987-654-3210",
        LockerPrice3Month: 100,
        LockerPrice6Month: 180,
        LockerPrice12Month: 300,
    },
];

function ExpiredLockers() {
    return (
        <section className="flex flex-col items-center w-full px-24 py-24 gap-12 bg-gray-50">
            {/* Header Section */}
            <section className="flex flex-col gap-4 items-center justify-between w-full font-medium">
                <h1 className="text-3xl font-medium">
                    Expired <span className="text-blue-500">Lockers</span>
                </h1>
            </section>

            {/* Locker Cards Section */}
            <section className="grid grid-cols-3 items-center justify-between gap-12">
                {expiredLockerDetails.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start bg-white shadow-lg rounded-lg text-[1rem] px-8 py-6 gap-4 border border-gray-200 transition-transform transform hover:scale-105"
                    >
                        {/* Locker Details */}
                        <p className="flex gap-4 items-center">
                            <span className="text-blue-500 font-medium flex items-center">
                                <i className="fas fa-lock mr-2"></i> Number:
                            </span>
                            {item.LockerNumber}
                        </p>
                        <p className="flex gap-4 items-center">
                            <span className="text-blue-500 font-medium flex items-center">
                                <i className="fas fa-envelope mr-2"></i> Email:
                            </span>
                            {item.employeeEmail}
                        </p>
                        <p className="flex gap-4 items-center">
                            <span className="text-blue-500 font-medium flex items-center">
                                <i className="fas fa-venus-mars mr-2"></i> Gender:
                            </span>
                            {item.availableForGender}
                        </p>
                        <p className="flex gap-4 items-center">
                            <span className="text-blue-500 font-medium flex items-center">
                                <i className="fas fa-user mr-2"></i> Name:
                            </span>
                            {item.employeeName}
                        </p>
                        <p className="flex gap-4 items-center">
                            <span className="text-blue-500 font-medium flex items-center">
                                <i className="fas fa-phone mr-2"></i> Phone:
                            </span>
                            {item.employeePhone}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-row gap-4 mt-4">
                            <button
                                onClick={() => alert(`Update Locker ${item.LockerNumber}`)}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
                            >
                                <i className="fas fa-edit"></i> Update
                            </button>
                            <button
                                onClick={() => alert(`Renew Locker ${item.LockerNumber}`)}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
                            >
                                <i className="fas fa-redo-alt"></i> Renew
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}

export default ExpiredLockers;
