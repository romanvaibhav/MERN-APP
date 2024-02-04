import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Logout = () => {
  // We use useContext to change the state to show only logout once we are login or vice-versa
  const { state, dispatch } = useContext(userContext);
  const history = useNavigate();
  // Showing The backend code for logout using promises
  useEffect(() => {
    // useEffect does not support async/await so we need to go with promises now
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        // To toggle login/logout button we use dispatch of useContext
        dispatch({ type: "USER", payload: false });
        history("/login", { replace: true });
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <></>;
};

export default Logout;
