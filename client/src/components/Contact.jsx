import React, { useEffect } from "react";
import Phone from "../images/phone.png";
import Email from "../images/email.png";
import Home from "../images/home.png";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const userContact = async () => {
    try {
      // Sending the cookies in the backend
      // Now we need to GET the data from backend and show in the about us page
      console.log("I am inside callAboutPage");
      // No need to use Accept and credentials as now we are not working with cookies and tokens
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // data has all the data
      const data = await res.json();
      // console.log("Data is ", data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      // console.log("UserData is ", userData);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      // means user has not signed in
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
    console.log("I am running");
  }, []);

  // storing data in states for functional contact page
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Sending Data to backend using onclick method
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("message not sent");
    } else {
      alert("Message Sent");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              {/* Phone Number */}
              <div className="contact_info_item">
                <img
                  src={Phone}
                  alt="phone image"
                  className="contact_image img-responsive"
                />
                <div className="info">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+91 9899184757</div>
                </div>
              </div>
            </div>
            <div className="col">
              {/* Email */}
              <div className="contact_info_item">
                <img
                  src={Email}
                  alt="Email image"
                  className="contact_image img-responsive email_image"
                />
                <div className="info">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">contactMe@gmail.com</div>
                </div>
              </div>
            </div>
            <div className="col">
              {/* Email */}
              <div className="contact_info_item">
                <img
                  src={Home}
                  alt="Home image"
                  className="contact_image img-responsive"
                />
                <div className="info">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">New Delhi, India</div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="row">
            <div className="col forms">
              <div className="contact_form">
                <h2 className="contact_form_heading">Get in Touch</h2>
                <form method="POST">
                  <div className="container-fluid">
                    <div className="row contact_form_detail">
                      <div className="col">
                        <div className="contact_form_input">
                          <input
                            type="text"
                            placeholder="Your Name..."
                            autoComplete="off"
                            required="true"
                            value={userData.name}
                            name="name"
                            onChange={handleInputs}
                            id="contact_form_name"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="contact_form_input">
                          <input
                            type="email"
                            placeholder="Your Email..."
                            autoComplete="off"
                            required="true"
                            value={userData.email}
                            name="email"
                            onChange={handleInputs}
                            id="contact_form_email"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="contact_form_input">
                          <input
                            type="number"
                            placeholder="Your Phone Number..."
                            autoComplete="off"
                            required="true"
                            value={userData.phone}
                            name="phone"
                            onChange={handleInputs}
                            id="contact_form_phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="contact_form_textarea">
                          <textarea
                            type="text"
                            autoComplete="off"
                            name="message"
                            value={userData.message}
                            onChange={handleInputs}
                            cols="30"
                            rows="10"
                            placeholder="Message..."
                            required="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group form-button">
                    <div className="contact-button">
                      <input
                        type="submit"
                        name="submit"
                        id="submit"
                        className="form-submit"
                        onClick={contactForm}
                        value="Send Message"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
