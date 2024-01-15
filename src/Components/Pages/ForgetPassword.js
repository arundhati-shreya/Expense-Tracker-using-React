import React,{useRef} from "react";
import { useNavigate } from 'react-router-dom';

const ForgetPassword=()=>{
        const navigate = useNavigate();
        const emailInputRef = useRef();
      
        const submitHandler = async (e) => {
          e.preventDefault();
          try {
            const enteredEmail = emailInputRef.current.value;
            const obj = {
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
            };
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDtpLp4tbp-1WlAy5DyLwzMBWXKLvkTTDA",
              {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error("Something went wrong!");
            }
            const data = await response.json();
            alert(
              "Reset Link has been sent to your mail id,kindly reset the password and login again"
            );
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        };
        return (
            <form onSubmit={submitHandler} className="container mt-5">
            <div className="form-group">
              <input
                required
                type="email"
                className="form-control"
                placeholder="Email"
                ref={emailInputRef}
              />
            </div>
      
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
          </form>
        );
      };
      


export default ForgetPassword;