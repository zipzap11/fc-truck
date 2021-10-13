import React from "react";
import classes from "./Loading.module.css";

const Loading = (props) => {
  return <div className={`${classes.loading} ${props.className}`}></div>;
};

export default Loading;
