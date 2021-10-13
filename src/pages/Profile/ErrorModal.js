import React from "react";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <>
      <h3>{props.children}</h3>
      <div className={classes.action}>
        <button onClick={props.onClose}>Close</button>
        <button onClick={props.onTryAgain}>Try Again</button>
      </div>
    </>
  );
};

export default ErrorModal;
