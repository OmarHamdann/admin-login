import React from "react";

import "../App.css";

const Welcome = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <h1 className="welcome">Welcome, please log in to continue.</h1>

      <img
        style={{ height: "40rem", width: "90rem" }}
        src="https://res.cloudinary.com/cryptoteam/image/upload/v1649769908/rfzlewitkupyvfl9jjc2.svg"
        alt="Welcome"
      />
    </div>
  );
};

export default Welcome;
