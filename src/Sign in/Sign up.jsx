import React from "react";
import { Link } from "react-router-dom";
import "./Sign up.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useContext } from "react";
import ThemeContext from "../Context/Context";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { RiLockPasswordLine } from "@react-icons/all-files/ri/RiLockPasswordLine";
import { useState } from "react";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const { Theme } = useContext(ThemeContext);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <main>Loading........</main>
      </div>
    );
  }
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Sign up</title>
          </Helmet>
        </HelmetProvider>

        <div className={`Sign ${Theme}`}>
          <div className="The-box">
            <form>
              <h2> Sign Up </h2>
            <p className="Error-m">{firebaseError}</p>
              <div className="input-box">
                <div className="icon">
                  <BsFillPersonFill />
                </div>
                <input
                  onChange={(eo) => {
                    setName(eo.target.value);
                  }}
                  type="text"
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="input-box">
                <div className="icon">
                  <BsFillPersonFill />
                </div>

                <input
                  onChange={(eo) => {
                    setEmail(eo.target.value);
                  }}
                  type="text"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-box">
                <div className="icon">
                  <RiLockPasswordLine />
                </div>
                <input
                  onChange={(eo) => {
                    setPassword(eo.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                onClick={(eo) => {
                  eo.preventDefault();

                  createUserWithEmailAndPassword(auth, Email, Password)
                    .then((userCredential) => {
                      // Signed in
                      const user = userCredential.user;
                      console.log(user);
                      sendEmailVerification(auth.currentUser).then(() => {
                        console.log("Email verification sent!");
                      });
                      updateProfile(auth.currentUser, {
                        displayName: Name,
                      })
                      .then(() => {
                        navigate("/");
                      })
                        .catch((error) => {
                          console.log(error.code);
                        });
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      sethasError(true);

                      switch (errorCode) {
                        case "auth/invalid-email":
                          setfirebaseError("Wrong Email");
                          break;

                        case "auth/user-not-found":
                          setfirebaseError("Wrong Email");
                          break;

                        case "auth/wrong-password":
                          setfirebaseError("Wrong Password");
                          break;

                        case "auth/too-many-requests":
                          setfirebaseError(
                            "Too many requests, please try aganin later"
                          );
                          break;

                        default:
                          setfirebaseError(
                            "Please check your email & password"
                          );
                          break;
                      }
                    });
                }}
                className="Submit" type="submit" > Sign Up
              </button>
              <div className="register">
                <p>
                  You have an account ? <Link to="/Signin">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default SignUp;
