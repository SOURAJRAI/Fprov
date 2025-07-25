
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext=createContext();


function AdminProvider( {children}) {
   const [isAdmin, setIsAdmin] = useState(null);
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

  return (
      <AdminContext.Provider values={{isAdmin,userName}}>
          {children}
      </AdminContext.Provider>
  )
}

export default AdminProvider