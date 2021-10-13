import React from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return reactDom.createPortal(
    <React.Fragment>
      <div className={classes.backdrop} onClick={props.onClick}></div>
      <div className={classes.content}>{props.children}</div>
    </React.Fragment>,
    document.getElementById("overlay")
  );
};

export default Modal;
