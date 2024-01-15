import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Profile from './Components/Profile';
import ForgetPassword from './Components/ForgetPassword';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  </Router>
  );
}

export default App;