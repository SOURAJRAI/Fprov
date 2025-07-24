import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function IsAdminCheck() {

    
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios
        .get("http://localhost:5000/api/Auth/isAdmin")
        .then((res)=>{
            console.log("inside navbar",res);
            
          setIsAdmin(true);

        })
        .catch((err)=>{
          setIsAdmin(false);
            navigate('/');
          console.log("Error ",err)
        });
  }, []);

  return isAdmin;
}

export default IsAdminCheck;
