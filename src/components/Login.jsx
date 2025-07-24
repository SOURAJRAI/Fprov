import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  

  const HandleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(()=>{
 axios.get("http://localhost:5000/api/Auth/isAuthenticated")
   .then((res) =>{
     if(res.data.authenticated)
       {
      navigate('/');
       }
   
})
   .catch((err)=> 
   { 
    console.log(err);
    
    // navigate('/');
    })
   },[]);

   const location=useLocation();


     useEffect(()=>{
      const message=location.state?.toastMsg;
    
        if(message)
        {
          toast.success(message,{ autoClose:1500});
          navigate(location.pathname,{replace:true})
        }
   },[navigate,location]);


  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginCredentials);





    axios
      .post("http://localhost:5000/api/Auth/login", loginCredentials)
      .then((result) => {
        console.log(result.data);
        if (result.data.Login) {
       
         
            navigate("/",{state:{toastMsg:"Login Successfull"}});
            
         
          console.log("result", result);
        } 
      })
      .catch((err) => {
        console.log(err);
        
          toast.error("Invalid Credentials",{
            autoClose:1000
          });
        
      });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <ToastContainer position="top-right" />
              <h3 className="text-primary fw-bold mb-3">Sign In</h3>

              {/* <!-- Email input --> */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  name="email"
                  onChange={HandleChange}
                />
              </div>

              {/* <!-- Password input --> */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  name="password"
                  onChange={HandleChange}
                />
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>

              <div className="d-flex align-items-center my-4">
                <div className="border-bottom w-100"></div>
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                <div className="border-bottom w-100"></div>
              </div>

              <div className="d-flex justify-content-center">
                <p className="text-muted">Don't have an account?</p>
                <Link to="/signup" className="fw-bold mx-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
