import React from "react";
import "./Sign up.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useContext } from "react";
import ThemeContext from "../Context/Context";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { RiLockPasswordLine } from "@react-icons/all-files/ri/RiLockPasswordLine";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../Loading/Loading";

const SignIn = () => {
  const { Theme } = useContext(ThemeContext);
  const [user, loading, error] = useAuthState(auth);
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [firebaseError, setfirebaseError] = useState("");
  const navigate = useNavigate();


  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Sign in</title>
        </Helmet>
      </HelmetProvider>

      <div className={`Sign ${Theme}`}>
      <div className="The-box">
          <form>
            <h2> Sign in</h2>
            <p className="Error-m">{firebaseError}</p>
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
            <div className="forgot-password">
              <Link to="/Forgot-pass">Forgot Password ?</Link>
            </div>
            <button
              onClick={(eo) => {
                eo.preventDefault();
                signInWithEmailAndPassword(auth, Email, Password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/")
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
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
                          "Too many requests, please try again later"
                        );
                        break;

                      default:
                        setfirebaseError("Please check your email & password");
                        break;
                    }
                  });
              }}
              className="Submit"
              type="submit"
            >
              Sign in
            </button>
            <div className="register">
              <p>
                Don't have an account ? <Link to="/Signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
