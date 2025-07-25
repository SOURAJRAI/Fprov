import React, { useEffect, useState } from "react";
import axios from "axios";

import { Navigate, Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import IsAdminCheck from "./isAdminCheck";

function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const authorise = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/Auth/isAuthenticated"
        );
        console.log("during authentication",res);

        setIsAuth(res.data.authenticated);
      } catch (err) {
        setIsAuth(false);
        console.log(err);
      }
    };
    setTimeout(() => {
      authorise();
    }, 1000);
  }, []);




  if (isAuth === null) {
    console.log(isAuth);
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            flexDirection: "column",
          }}
        >
          <ScaleLoader
            barCount={6}
            color="blue"
            height={40}
            margin={5}
            radius={6}
            speedMultiplier={1}
            width={5}
          />
          <p className=" ms-3 mt-4 mb-0 text-muted text-center">Loading...</p>
        </div>
      </div>
    );
  }
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
