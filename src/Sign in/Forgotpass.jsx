import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useContext } from "react";
import ThemeContext from "../Context/Context";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { RiLockPasswordLine } from "@react-icons/all-files/ri/RiLockPasswordLine";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const Forgotpass = () => {
    const { Theme } = useContext(ThemeContext);
    // for forgot pass
    const [resetPass, setresetPass] = useState("");
    const [showSendEmail, setshowSendEmail] = useState(false);
    const [firebaseError, setfirebaseError] = useState("");

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Rest Password</title>
        </Helmet>
      </HelmetProvider>

      <div className={`Sign ${Theme}`}>
        <div className="The-box">
          <form>
            <h2> Forgot Password </h2>
            {/* this important to send email ro rest pass */}
            {showSendEmail && (
            <p className="check-email">
              Please check your email to reset your password.
            </p>
          )}
            <p className="Error-m">{firebaseError}</p>
            <div className="input-box">
              <div className="icon">
                <BsFillPersonFill />
              </div>
              <input
                onChange={(eo) => {
                  setresetPass(eo.target.value);
                }}
                type="text"
                placeholder="Email"
                required
              />
            </div>
            <button
              onClick={(eo) => {
                eo.preventDefault();
                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    setshowSendEmail(true);
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
              Rest Password
            </button>
            <div className="register">
              <p>
                Don't have an account ? <Link to="/Signin">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpass;
