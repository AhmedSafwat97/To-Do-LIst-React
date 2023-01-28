import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import Loading from "../Loading/Loading";
import { useContext } from "react";
import ThemeContext from "../Context/Context";
import { Helmet , HelmetProvider } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const { Theme } = useContext(ThemeContext);


  if (loading) {
    return <Loading/>
  }


  return (
    <div className={`Home ${Theme}`}>
            <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>

      {user && 
    <div className="Welcome">
          <div className="v-message">
          <h4>Welcome: {user.email} <span>🧡</span></h4>
    </div>
</div>
      
      }

      {!user && (
        <div>
          <h1 className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue... 🧡
          </h1>
        </div>
        )}


    </div>
  );
};

export default Home;
