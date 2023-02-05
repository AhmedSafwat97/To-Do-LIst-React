import React from "react";
import "./Modal.css";
import ThemeContext from "../Context/Context";
import { useContext } from "react";

const Modal = ({children}) => {
  const { ModalState } = useContext(ThemeContext);

  return (
    <div className={`Modal ${ModalState}`}>
      {children}
    </div>
  );
};

export default Modal;
