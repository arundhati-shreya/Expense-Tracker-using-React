import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Pages/SignUp';
import LogIn from './Components/Pages/LogIn';
import Profile from './Components/Pages/Profile';
import ForgetPassword from './Components/Pages/ForgetPassword';
import Expense from './Components/Expenses/Expense';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/expense" element={<Expense />} />

    </Routes>
  </Router>
  );
}

export default App;