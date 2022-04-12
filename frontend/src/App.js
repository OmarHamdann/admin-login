import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import React from "react";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import Welcome from "./components/Welcome";

//===============================================================

const App = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <div className="App">
      <Navigation />

      <Routes>
        {state.isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Welcome />} />
        )}

        {state.isLoggedIn ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="/home" element={<Welcome />} />
        )}

        <Route
          path="*"
          exact={true}
          element={
            <>
              <img
                style={{ height: "40rem", width: "90rem" }}
                src="https://res.cloudinary.com/cryptoteam/image/upload/v1647692917/g0xrimqejlp3rqd6y5hk.svg"
                alt="404 Page not found"
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
