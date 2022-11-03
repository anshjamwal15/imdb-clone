import React, { useEffect } from "react";
import { useState } from "react";
import '../components/assets/LoginAndSignUp.css';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AddUser, loginUser } from "../services/service";

function LoginAndSignUp() {

    const [isActive, setIsActive] = useState(false);

    const [messageFrom, setMessageForm] = useState({
        name: '', email: '', password: ''
    });

    const navigate = useNavigate();

    const handleSignUpChange = (e) => {
        setMessageForm({ ...messageFrom, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setMessageForm({ ...messageFrom, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        setIsActive(current => !current);
    }

    const handleSignUp = async (e) => {
        AddUser(messageFrom).then((res) => {
        });
        // navigate('/');
    }

    const handleLogin = async (e) => {
        loginUser(messageFrom).then((res) => {
        });
        navigate('/');
    }

    useEffect(() => {
        setTimeout(() => {
            const login = localStorage.getItem('userDetails');
            if (login) {
                navigate('/');
            }
        }, 800);
    });

    return (
        <>
            <div className="userentry">
                <div className={isActive ? 'container right-panel-active' : 'container'} id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><FaFacebook /></a>
                                <a href="#" className="social"><FaGoogle /></a>
                                <a href="#" className="social"><FaLinkedin /></a>
                            </div>
                            <span className="myspan">or use your email for registration</span>
                            <input type="text" onChange={e => handleSignUpChange(e)} name="name" placeholder="Name" />
                            <input type="email" onChange={e => handleSignUpChange(e)} name="email" placeholder="Email" />
                            <input type="password" onChange={e => handleSignUpChange(e)} name="password" placeholder="Password" />
                            <button type="submit" >Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLogin}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><FaFacebook /></a>
                                <a href="#" className="social"><FaGoogle /></a>
                                <a href="#" className="social"><FaLinkedin /></a>
                            </div>
                            <span className="myspan">or use your account</span>
                            <input type="email" onChange={e => handleLoginChange(e)} name="email" placeholder="Email" />
                            <input type="password" onChange={e => handleLoginChange(e)} name="password" placeholder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p className="mypTag">To keep connected with us please login with your personal info</p>
                                <button onClick={handleClick} className="ghost" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p className="mypTag">Enter your personal details and start journey with us</p>
                                <button onClick={handleClick} className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAndSignUp;