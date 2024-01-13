import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_FIREBASE_API_KEY`, {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userCredential = await response.json();

                // The user is signed up
                console.log('User signed up:', userCredential);

                // Reset the form after successful signup
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Error signing up:', errorData.error.message);
                alert(errorData.error.message);
            }
        } catch (error) {
            console.error('Error signing up:', error.message);
            alert(error.message);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card w-50">
                <div className="card-body">
                    <h2 className="card-title text-center">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" onChange={handleChange} value={formData.email} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={handleChange} value={formData.password} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
