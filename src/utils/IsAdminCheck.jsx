import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function IsAdminCheck() {

    
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName,setUserName]=useState();

    const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios
        .get("http://localhost:5000/api/Auth/isAdmin")
        .then((res)=>{
            console.log("inside navbar",res);
            if(res.data.user.Privilage){
              setIsAdmin(true);
              setUserName(res.data.user.username);
            }else{
              setIsAdmin(false);
              setUserName(res.data.user.username)
              navigate('/');
            }
            
          
        })
        .catch((err)=>{
            setIsAdmin(false);
            navigate('/login',{state:{
              toastMsg:err.response.data.message
            }});
          console.log("Error ",err)
        });
  }, [navigate]);

  return{
      isAdmin,userName
  } 
}

export default IsAdminCheck;
