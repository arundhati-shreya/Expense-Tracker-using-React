import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();

    const ProfileHandler = () => {
        navigate('/profile');
    }

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
   

    const logoutHandler=()=>{
        localStorage.removeItem('token')
        navigate('/')
    }

    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const idToken = localStorage.getItem("token");
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAPTNI_cnBDpM3UpcM5Z8KjHllp5W3snT0',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken: idToken,
                    }),
                }
            )
            if (response.ok) {
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
                    className="btn btn-primary"
                    onClick={sendVerificationEmail}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Verify Your Email"}
                </button>
                {isEmailSent && (
                    <div className="alert alert-success">
                        A verification email has been sent. Check your email, you might have
                        received a verification link. Click on it to verify.
                    </div>
                )}
            </div>
        </>
    );
}

export default LogIn;
