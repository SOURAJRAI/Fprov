import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function IsAdminCheck() {

    
    const [isAdmin, setIsAdmin] = useState(false);
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
        
          console.log("Error ",err)
        });
  }, []);

  return isAdmin;
}

export default IsAdminCheck;

