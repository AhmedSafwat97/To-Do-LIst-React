import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { WiMoonAltThirdQuarter } from "@react-icons/all-files/wi/WiMoonAltThirdQuarter";
import { useContext } from "react";
import Context from "../Context/Context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

const Header = () => {
  const { Theme, toggleTheme } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate()

  return (
    <div>
      <Navbar bg={`light" expand="lg ${Theme}`}>
        <Container fluid>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
      
                <NavLink to="/" className="Header">
                  Home
                </NavLink>

              {!user &&
              <NavLink to="/Signin" className="Header">
                Sign in
              </NavLink> }

              {/* <NavLink to="/Signup" className="Header">
                Sign up
              </NavLink> */}

              {user &&
            <NavLink className="Header" to="/profile">
              Profile
            </NavLink> }

              {/* For Dark Mood */}

              <WiMoonAltThirdQuarter
                className="DarkMood"
                onClick={() => {
                  toggleTheme(Theme === "Light" ? "dark" : "Light");
                }}
              />

              {/* End DarkMood */}
              {/* start sign out button */}
              {user && (
                <button
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        console.log("Sign-out successful.");
                        navigate("/")
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                >
                  {" "}
                  Sign-out{" "}
                </button>
              )}

              {/* start sign out button */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
