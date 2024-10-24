import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const EnterEmail = lazy(() => import("./components/EnterEmail"));
const EnterOtp = lazy(() => import("./components/EnterOtp"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));

const App = () => {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/enter" element={<EnterEmail />} />
                <Route path="/otp" element={<EnterOtp />} />
                <Route path="/reset" element={<ResetPassword />} />
            </Routes>
        </Suspense>
    );
};

export default App;
