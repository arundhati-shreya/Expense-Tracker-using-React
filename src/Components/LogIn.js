import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();

    const ProfileHandler=()=>{
        navigate('/profile');
    }

    return (
        <div className="container-fluid px-0">
            <div className="row m-0">
                <div className="col-md-8">
                    <p className="m-0" style={{ fontStyle: "italic" }}>Welcome To Expense Tracker!!!</p>
                </div>
                <div className="col-md-3 text-md-right">
                    <p className=" bg-info rounded"  style={{ fontStyle: "italic" }}>
                        Your profile is Incomplete.
                        <button className="btn btn-primary rounded-pill" onClick={ProfileHandler}>Complete Now</button>
                    </p>
                </div>
            </div>
            <hr className="m-0" />
        </div>
    );
}

export default LogIn;
