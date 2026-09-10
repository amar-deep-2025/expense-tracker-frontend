import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyOtp from "./pages/VerifyOtp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
