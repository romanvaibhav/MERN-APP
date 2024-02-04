import React, { useContext, useState } from "react";
import "../App.css";
import loginpic from "../images/login.jpg";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Login = () => {
  // We use useContext to change the state to show only logout once we are login or vice-versa
  const { state, dispatch } = useContext(userContext);
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Sending form data to backend using onClick function
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (data.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      // To toggle login/logout button we use dispatch of useContext
      dispatch({ type: "USER", payload: true });
      window.alert("Login SuccessFull");
      console.log("Login SuccessFull");
      history("/");
    }
  };
  return (
    <>
      <section className="signup login">
        <div className="mt-5">
          <div className="signup-content container-fluid">
            <div className="signup-form row">
              <div className="signup-image col-sm-6 col-xs-12">
                <figure>
                  <img
                    src={loginpic}
                    alt="Sign in"
                    className="signin-image img-responsive"
                  />
                </figure>
                <NavLink to="/signup" className="signup-image-link">
                  Create an Account
                </NavLink>
              </div>
              <div className="col-sm-6 col-xs-12 form-div">
                <h2 className="form-title">Sign In</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group login-group">
                    <label htmlFor="email">
                      <EmailIcon />
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      placeholder="Enter Your Email..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <PasswordIcon />
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      placeholder="Enter Your Password..."
                    />
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit login-button"
                      value="Sign In"
                      onClick={loginUser}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
