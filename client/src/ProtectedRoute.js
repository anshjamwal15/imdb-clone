import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginAndSignUp from "./pages/LognAndSignUp";

const ProtectedRoute = (props) => {

    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('userDetails');
        if (!login) {
            navigate('/login');
        }
    });

    return (<Component />);
};

export default ProtectedRoute;