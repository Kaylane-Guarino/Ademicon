import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import { ToastContainer } from "react-toastify";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

const PagesRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default PagesRoutes;
