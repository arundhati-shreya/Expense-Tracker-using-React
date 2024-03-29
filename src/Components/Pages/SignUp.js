import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';


const Signup = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (isLoggedIn) {
      // navigate('/expense');
      navigate('/login');
    }
  }, []);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtpLp4tbp-1WlAy5DyLwzMBWXKLvkTTDA'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtpLp4tbp-1WlAy5DyLwzMBWXKLvkTTDA';

    try {
      const response = await fetch(url, {
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
        const token = userCredential.idToken;
        const email =userCredential.email;
        const userId = email.replace(/[^a-zA-Z0-9\s]/g, "");

        dispatch(login({ token, userId }));
        // localStorage.setItem('token', token);
        // localStorage.setItem('email',email)

        // console.log('User signed up:', userCredential);

        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
        });
       
        if (isLogin) {
          navigate('/login');
          // navigate('/expense')
        } else {
          
          setIsLogin(true);
        }
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
          <h2 className="card-title text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              {!isLogin ? 'Signup' : 'Login'}
            </button>
            {isLogin && <Link to="/forgot-password">Forgot Passord?</Link>}
          </form>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
