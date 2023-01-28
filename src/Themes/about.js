import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../Context/Context";

const About = () => {
  const { Theme } = useContext(ThemeContext);
  return (
    <div className={`App ${Theme}`}>
      <Link to="/" style={{ fontSize: "25px", margin: "20px" }}>
        Home
      </Link>
      <h1>Hello from About Page</h1>
    </div>
  );
};

export default About;
