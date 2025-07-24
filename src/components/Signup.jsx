import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [signUpCredentials, setSignUpCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpCredentials({ ...signUpCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = signUpCredentials["username"];
    const email = signUpCredentials["email"];

    const pass1 = signUpCredentials["password"];
    const pass2 = signUpCredentials["confirmPassword"];

    if (pass1 !== pass2) {
      toast.error("Password Doesnt match");
      return;
    }

    console.log("Sign Up form submitted", {
      username: username,
      email: email,
      password: pass1,
    });

    axios
      .post("http://localhost:5000/api/Auth/signup", {
        username: username,
        email: email,
        password: pass1,
      })
      .then((res) => {
        if (res.data.Signup) {
          toast.success("User Registered");
          navigate("/login");
             setSignUpCredentials({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
            toast.error(err.response.data.message);

        console.log(err)});

 
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://scuadmission.in/fees_portal/assest/images/signup.png"
              className="img-fluid"
              alt="Sign Up illustration"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <h3 className="text-primary fw-bold mb-3">Create an Account</h3>
              {/* Username input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form1ExampleUsername">
                  Username
                </label>
                <input
                  type="text"
                  id="form1ExampleUsername"
                  className="form-control  form-control-lg"
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form1ExampleEmail">
                  Email address
                </label>
                <input
                  type="email"
                  id="form1ExampleEmail"
                  className="form-control  form-control-lg"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form1ExamplePassword">
                  Password
                </label>
                <input
                  type="password"
                  id="form1ExamplePassword"
                  className="form-control  form-control-lg"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label
                  className="form-label"
                  htmlFor="form1ExampleConfirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="form1ExampleConfirmPassword"
                  className="form-control  form-control-lg"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign Up
              </button>

              <div className="d-flex align-items-center my-4">
                <div className="border-bottom w-100"></div>
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                <div className="border-bottom w-100"></div>
              </div>

              {/* Link to Login */}
              <div className="d-flex justify-content-center">
                <p className="text-muted">Already have an account?</p>
                <Link to="/" className="fw-bold mx-2">
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
