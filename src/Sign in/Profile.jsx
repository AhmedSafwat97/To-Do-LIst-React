import React from "react";
import "./Profile.css";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import ThemeContext from "../Context/Context";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase//Firebase";
import Moment from "react-moment";

const Profile = () => {
  const { Theme } = useContext(ThemeContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });
  // the page that will appear when the server loading
  if (loading) {
    return <Loading/>
  }

  if (user) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Profile</title>
          </Helmet>
        </HelmetProvider>

        <div className={`profile ${Theme}`}>
          <div>
            <h2>Email : {user.email} </h2>
            <h2>Name : {user.displayName}</h2>
            {/* to show the last time that we sign in */}

            <h3>
              Last Sign-in :{" "}
              <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
            </h3>

            <h3>
              Account Created :{" "}
              <Moment fromNow date={user.metadata.creationTime} />
            </h3>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
