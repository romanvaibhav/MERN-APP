import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import lokesh from "../images/lokesh.jpg";
import aboutpic from "../images/aboutpic.webp";

const About = () => {
  const history = useNavigate();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      // Sending the cookies in the backend
      // Now we need to GET the data from backend and show in the about us page
      console.log("I am inside callAboutPage");
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // data has all the data
      const data = await res.json();
      console.log("Data is ", data);
      setUserData(data);
      console.log("UserData is ", userData);
      console.log(userData.name);
      console.log(userData.name);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      // means user has not signed in
      console.log(err);
      history("/login", { replace: true });
    }
  };

  useEffect(() => {
    callAboutPage();
    console.log("I am running");
  }, []);
  return (
    <>
      <div className="container employee-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img
                src={userData.name === "Lokesh Melkani" ? lokesh : aboutpic}
                alt="employee image"
                className="employee-image img-responsive"
              />
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                {/* <h5>{userData.name}</h5> */}
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3  mb-5">
                  Ranking : <span className="profile-head-ranking">1/10</span>
                </p>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                name="btnAddMore"
                className="profile-edit-btn"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 navtabs">
              <ul className="nav" role="tablist">
                <li className="nav-item profile-head-items">
                  <a
                    className="nav-link"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item profile-head-items">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                  >
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            {/* Left Side Content */}
            <div className="col-md-4">
              <div className="profile-work">
                <p className="profile-work-para">WORK LINK</p>
                <a
                  href="https://www.linkedin.com/in/lokesh-melkani-22572b218/"
                  target="_linkedin"
                >
                  Linkedin
                </a>
                <br />
                <a href="https://github.com/LokeshMelkani07" target="_github">
                  Github
                </a>
                <br />
                <a
                  href="https://www.facebook.com/Lokesh.Melkani77"
                  target="_facebook"
                >
                  Facebook
                </a>
                <br />
                <a
                  href="https://www.instagram.com/lokesh_melkani/"
                  target="_instagram"
                >
                  Instagram
                </a>
                <br />
                <a href="lokeshmelkani5102001@gmail.com" target="_gmail">
                  Gmail
                </a>
                <br />
              </div>
            </div>
            {/* Right Side Content */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTableContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label">User_ID</label>
                    </div>
                    <div className="col-md-6  col-sm-6 user_details">
                      <label className="about-info-label-new">
                        {userData._id}
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-  col-sm-6 user_details">
                      <label className="about-info-label">Name</label>
                    </div>
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label-new">
                        {userData.name}
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label">Email</label>
                    </div>
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label-new">
                        {userData.email}
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label">Phone</label>
                    </div>
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label-new">
                        {userData.phone}
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label">Work</label>
                    </div>
                    <div className="col-md-6 col-sm-6 user_details">
                      <label className="about-info-label-new">
                        {userData.work}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
