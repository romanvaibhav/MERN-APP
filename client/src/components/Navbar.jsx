import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";
import { userContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(userContext);
  const RenderMenu = () => {
    if (state) {
      // means user has logged in so no need to show signin and login show logout
      return (
        <>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/"
              className="nav-link"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/about"
              className="nav-link"
              aria-current="page"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/contact"
              className="nav-link"
              aria-current="page"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "green", textDecoration: "none" }}
              to="/logout"
              className="nav-link"
              aria-current="page"
            >
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      // User is not logged in so show signin and login don't show logout
      return (
        <>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/"
              className="nav-link"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/about"
              className="nav-link"
              aria-current="page"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/contact"
              className="nav-link"
              aria-current="page"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "red", textDecoration: "none" }}
              to="/login"
              className="nav-link"
              aria-current="page"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{ color: "green", textDecoration: "none" }}
              to="/signup"
              className="nav-link"
              aria-current="page"
            >
              Signup
            </NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img className="logo-image" src={logo} alt="Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
