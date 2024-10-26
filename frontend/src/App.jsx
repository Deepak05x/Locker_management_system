import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthProvider from "./context/AuthProvider";
import LockerProvider from "./context/LockerProvider";

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const EnterEmail = lazy(() => import("./components/EnterEmail"));
const EnterOtp = lazy(() => import("./components/EnterOtp"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Testing = lazy(() => import("./components/Testing"));
const LockerManagement = lazy(() => import("./components/LockerManagement"));
const AddSingleLocker = lazy(() => import("./components/AddSingleLocker"));
const AvailableLockers = lazy(() => import("./components/AvailableLockers"));
const AssignLocker = lazy(() => import("./components/AssignLocker"));

const App = () => {
    return (
        <LockerProvider>
            <AuthProvider>
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/enter" element={<EnterEmail />} />
                        <Route path="/otp" element={<EnterOtp />} />
                        <Route path="/reset" element={<ResetPassword />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/testing" element={<Testing />} />
                        <Route path="/locker_management" element={<LockerManagement />} />
                        <Route path="/add_single_locker" element={<AddSingleLocker />} />
                        <Route path="/available_lockers" element={<AvailableLockers />} />
                        <Route path="/assign_locker" element={<AssignLocker />} />
                    </Routes>
                </Suspense>
            </AuthProvider>
        </LockerProvider>
    );
};

export default App;
