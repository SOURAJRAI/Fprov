// src/components/AdminRoute.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import IsAdminCheck from "./isAdminCheck";

const AdminRoute = ({ children }) => {
//   const [allow, setAllow] = useState(false);
//   const navigate = useNavigate();
const allow=IsAdminCheck();

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/Auth/isAdmin", { withCredentials: true })
//       .then(() => {
//         setAllow(true);
//       })
//       .catch(() => {
//         setAllow(false);
//         navigate('/');
//       });
//   }, [navigate]);


  return allow ? children : null;
};

export default AdminRoute;