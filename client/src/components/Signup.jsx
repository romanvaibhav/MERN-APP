import React, { useState } from "react";
import "../App.css";
import signpic from "../images/signup.webp";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import PasswordIcon from "@mui/icons-material/Password";
import KeyIcon from "@mui/icons-material/Key";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const history = useNavigate();
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    // We will post information in "/register URL using fetchAPI just like we did in postman"
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // both key and value are same so instead of writing name:name we just write name
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    // we will add a field "proxy": "http://localhost:4000",in package.json of client because our server is running in port 5000 and our /register page only exist in port 5000 but client is running at 3000
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registartion");
      console.log("Invalid Registration");
    } else {
      window.alert("Registartion SuccessFull");
      console.log("Registration SuccessFull");
      history("/login");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="mt-5">
          <div className="signup-content container-fluid">
            <div className="signup-form row">
              <div className="col-sm-6 col-xs-12 form-div">
                <h2 className="form-title">Sign up</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <PersonIcon />
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      onChange={handleInputs}
                      value={user.name}
                      placeholder="Enter Your Name..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <EmailIcon />
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      onChange={handleInputs}
                      value={user.email}
                      placeholder="Enter Your Email..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <PhoneIcon />
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      onChange={handleInputs}
                      value={user.phone}
                      placeholder="Enter Your Phone Number..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work">
                      <WorkIcon />
                    </label>
                    <input
                      type="text"
                      name="work"
                      id="work"
                      autoComplete="off"
                      onChange={handleInputs}
                      value={user.work}
                      placeholder="Enter Your Profession..."
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
                      autoComplete="off"
                      onChange={handleInputs}
                      value={user.password}
                      placeholder="Enter Your Password..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <KeyIcon />
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      onChange={handleInputs}
                      value={user.cpassword}
                      placeholder="Confirm Your Password..."
                    />
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                      onClick={postData}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image col-sm-6 col-xs-12">
                <figure>
                  <img
                    src={signpic}
                    alt="registration"
                    className="signin-image img-responsive"
                  />
                </figure>
                <NavLink to="/login" className="signup-image-link">
                  I am Already Registered
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
