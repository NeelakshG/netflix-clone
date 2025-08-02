import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("you have loaded in");
        navigate("/home");
      } else {
        console.log("you have loaded out");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div>
      <ToastContainer ttheme="dark" />

      {/* using routing paths to switch between different pages */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
