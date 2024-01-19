import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/store";
import axios from "axios";


const LogIn = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const idToken = useSelector((state) => state.auth.token); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const ProfileHandler = () => {
        navigate('/profile');
    }
   

    const logoutHandler=()=>{
        dispatch(logout());
        // localStorage.removeItem('token')
        navigate('/')
    }

    const OpenExpenseHandler=()=>{
        if(isLoggedIn){
            navigate('/expense')
        }
    }

    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDtpLp4tbp-1WlAy5DyLwzMBWXKLvkTTDA',
                {
                    requestType: "VERIFY_EMAIL",
                    idToken: idToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                setIsEmailSent(true);
            } else {
                const errorData = await response.json();
                setError(errorData.error.message);
            }

        } catch (err) {
            console.error(error);
            setError("An error occurred while sending the verification email.");
        } finally {
            setLoading(false);
        }
    }
    console.log("isEmailSent:", isEmailSent);

    return (
        <>
            <div className="container-fluid px-0">
            <div className="row m-0 align-items-center">
                <div className="col-md-6">
                    <p className="m-0" style={{ fontStyle: "italic" }}>Welcome To Expense Tracker!!!</p>
                </div>
                <div className="col-md-3 text-md-right">
                    <button className="btn btn-secondary" onClick={logoutHandler}>Logout</button>
                </div>
                <div className="col-md-3 text-md-right">
                    <p className=" bg-info rounded" style={{ fontStyle: "italic" }}>
                        Your profile is Incomplete.
                        <button className="btn btn-primary rounded-pill" onClick={ProfileHandler}>Complete Now</button>
                    </p>
                </div>
            </div>
            </div>
            <hr className="m-0" />
            <div>
                <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={sendVerificationEmail}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Verify Your Email"}
                </button>
                {isEmailSent && <div className="alert alert-success">
                        A verification email has been sent. Check your email, you might have
                        received a verification link. Click on it to verify.
                    </div>}
              
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center ">
              <Link to="/expense">Start Tracking your Expenses</Link>
               {/* <button className="btn btn-success" onClick={OpenExpenseHandler}>Start Tracking your Expenses</button> */}
           
            </div>
        </>
    );
}

export default LogIn;
