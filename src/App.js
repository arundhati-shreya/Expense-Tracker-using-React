import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  );
}

export default App;