import React from "react";
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import "./Modal"


const NotificationModel = ({children , ShowMessage}) => {
  return (
      <div
        className="Message"
        style={{ right: ShowMessage ? "5px" : "-100vw" }}
      >
        <AiFillCheckCircle
          style={{
            color: "orange",
            fontSize: "25px",
            marginRight: "6px",
          }}
        />
        {children}
      </div>
  );
};

export default NotificationModel;
