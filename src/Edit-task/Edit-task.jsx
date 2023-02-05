import React from "react";
import "./Edit-task.css";
import Header from "../Header/Header"
import { useContext } from "react";
import ThemeContext from "../Context/Context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { doc } from "firebase/firestore";
import TitleSection from "./Title-section";
import ListSec from "./List-Sec";
import { useParams } from "react-router-dom";
import { arrayUnion, updateDoc, deleteDoc } from "firebase/firestore";
import NotificationModel from "../Popup Modal/Notification-Model";
import Loading from "../Loading/Loading";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const { Theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [TitleList, setTitleList] = useState("");
  const [ListItems, setListItems] = useState([]);
  const [Listinput, setListinput] = useState("");
  const [Showaddbar, setShowaddbar] = useState(false);
  const [hidebtn, sethidebtn] = useState(true);
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowDelMessage, setShowDelMessage] = useState(false);
  const [ShowData, setShowData] = useState(false);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (user) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Task</title>
          </Helmet>
        </HelmetProvider>

        <Header/>



        {ShowData ? (
          <h1>Error : {error.message}</h1>
        ) : (
          <div className={`Edit-task  ${Theme} `}>
            <section className="Edit-area">
              {/* ======================================== */}
              <TitleSection setTitleList={setTitleList} Id={id} user={user} />
              {/* ======================================== */}

              {/* ======================================== */}
              <ListSec
                ListItems={ListItems}
                Id={id}
                user={user}
                ShowDelMessage={ShowDelMessage}
              />
              {/*==========================================  */}

              <div className="bar">
                {Showaddbar && (
                  <form>
                    <input
                      type="text"
                      onChange={(eo) => {
                        setListinput(eo.target.value);
                      }}
                      value={Listinput}
                      placeholder="Task Name"
                      className="list-input"
                      required
                    />
                    <button
                      style={{ width: "70px" }}
                      // to update the data in the array
                      onClick={async (eo) => {
                        eo.preventDefault();
                        if (
                          !ListItems.includes(Listinput) &&
                          Listinput !== ""
                        ) {
                          // ListItems.push(Listinput);
                          await updateDoc(doc(db, user.uid, id), {
                            List: arrayUnion(Listinput),
                          });
                        }

                        setShowMessage(true);

                        setTimeout(() => {
                          setShowMessage(false);
                        }, 4000);

                        console.log(ListItems);
                        setListinput("");
                      }}
                      className="add-list"
                    >
                      Add +
                    </button>
                    <button
                      onClick={() => {
                        sethidebtn(true);
                        setShowaddbar(false);
                      }}
                      style={{ width: "70px" }}
                      className="add-list "
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
              <section className="bar">
                <button
                  onClick={async (eo) => {
                    setShowData(true)
                    // replace = true to replace the deleted link 
                    navigate("/" , {replace : true});
                    await deleteDoc(doc(db, user.uid, id));
                  }}
                  className="delete-all"
                >
                  Delete
                </button>

                {hidebtn && (
                  <button
                    onClick={() => {
                      setShowaddbar(true);
                      sethidebtn(false);
                    }}
                    className="delete-all"
                  >
                    Add New Sup List +{" "}
                  </button>
                )}
              </section>
            </section>
          </div>
        )}
        <NotificationModel ShowMessage={ShowMessage}>
          <span>Task added successfully</span>
        </NotificationModel>
      </>
    );
  }
};

export default EditTask;

