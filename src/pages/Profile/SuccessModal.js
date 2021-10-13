import React from "react";
import classes from "./SuccessModal.module.css";

const SuccessModal = (props) => {
  return (
    <div className={classes.success}>
      <i className={`fas fa-check-circle ${classes.check}`}></i>
      <h3>{props.children}</h3>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default SuccessModal;
