// get the Card Data From Data bass
import React from "react";
import { BsCardList } from "@react-icons/all-files/bs/BsCardList";
import { AiFillEdit } from "@react-icons/all-files/ai/AiFillEdit";
import { db } from "../Firebase/Firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Moment from "react-moment";
import { updateDoc } from "firebase/firestore";
import { useRef } from "react";

const TitleSection = ({ Id, user }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, Id));
    const titleInput  = useRef(null)


  if (value) {
    return (
      <>
        <section className="Title-sec">
            <BsCardList style={{ fontSize :"30px"}}  />
            <input

            style={{textDecoration : value.data().completed ? "5px  line-through black" : null }}


              ref={titleInput}
              onChange={async (eo) => {
                await updateDoc(doc(db, user.uid, Id), {
                  title: eo.target.value,
                });
              }}
              className="title-input"
              type="text"
              defaultValue={`${value.data().title}`}
            />
            <AiFillEdit 
            onClick={() => {
              titleInput.current.focus()
            }}
            style={{ fontSize :"30px" , cursor : "pointer" , marginLeft :"10px"}} />
        </section>
        <section className="bar">
          <p>
            Created from : <Moment fromNow date={value.data().id} />
          </p>
          <div className="check-box">
            <input
              onChange={ async (eo) => {
                if (eo.target.checked) {
                  await updateDoc(doc(db, user.uid, Id), {
                    completed: true
                  });
                } else {
                  await updateDoc(doc(db, user.uid, Id), {
                    completed: false
                  });
                }
              }}
              id="checkbox"
              type="checkbox"
              checked={value.data().completed}
            />
            <label htmlFor="checkbox" style={{ marginLeft: "7px" }}>
              Completed{" "}
            </label>
          </div>
        </section>
      </>
    );
  }
};

export default TitleSection;
