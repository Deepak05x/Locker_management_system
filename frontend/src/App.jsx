import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

const App = () => {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Suspense>
    );
};

export default App;
