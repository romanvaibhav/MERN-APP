import React, { useState, useEffect } from "react";
import "../App.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // data has all the data
      const data = await res.json();
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      // means user has not signed in
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
    console.log("I am running");
  }, []);

  return (
    <>
      <div className="home">
        <div className="home-div h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-center">
            <p
              className="fs-3"
              style={{
                letterSpacing: "0.5em",
                color: "#03CC58",
              }}
            >
              WELCOME
            </p>
          </div>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "65px",
              textAlign: "center",
            }}
          >
            {userName}
          </h1>
          <h2
            style={{
              fontWeight: "normal",
            }}
          >
            {show ? "You are Awesome !!" : "We are Learning"}
          </h2>
        </div>
      </div>
      {/* <div className="home-page">
        <div className="home-div">
          <p className="pt-5">Welcome</p>
          <h1>We are The MERN Developer</h1>
        </div>
  </div> */}
    </>
  );
};

export default Home;
