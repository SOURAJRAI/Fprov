import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/navbar.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import {SiOpenai} from "react-icons/si";
import { FaUserShield, FaUserTie } from 'react-icons/fa';


import IsAdminCheck from '../utils/isAdminCheck';

const Navbar = () => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    axios
      .post("http://localhost:5000/api/Auth/logout")
      .then(() => {
        // toast.success("Logged oout Successfully")
        navigate("/login", { state: { toastMsg: "logged out Successfully" } });
        console.log("isAdmin",isAdmin)
        console.log("username",userName)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Logout Failed");
      });
  };

  const {isAdmin}=IsAdminCheck();
  const {userName}=IsAdminCheck();


 return (
    <nav className="navbar">
         <div className="navbar-brand">
    
        <div className="user-info">
          {userName === "admin" ? 
            <FaUserShield className="user-icon" /> : 
            <FaUserTie className="user-icon" />
          }
          <h2>{userName?.toUpperCase()}</h2>
        </div>
      </div>
      
      <div className="nav-links">
        {isAdmin &&

          <Link to="/dashboard" className="nav-item">
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </Link>
        }
        
        <Link to="/" className="nav-item">
          <i className="fas fa-route"></i>
          <span>Tracking</span>
        </Link>
      </div>

      <button onClick={HandleLogout} className="logout-btn">
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;