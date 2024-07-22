import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EditUser from './components/EditUser';
import GroupChat from './components/GroupChat';
import './index.css'

export default function App() {
  return (
    <Router>
      <div className="font-[Noto Sans]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/group-chat" element={<GroupChat />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

