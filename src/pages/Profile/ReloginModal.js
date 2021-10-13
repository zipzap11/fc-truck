import React, { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import { auth } from "../../db/firebase";
import ErrorModal from "./ErrorModal";
import classes from "./ReloginModal.module.css";

const ReloginModal = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetInput = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((res) => {
        console.log("SUCCESS RE-LOGIN", res);
        setIsLoading(false);
        props.setReLogin(true);
      })
      .catch((err) => {
        console.log(isLoading);
        console.log("MASUK IF");
        setIsLoading(false);
        setError(true);
        console.log("FAILED RE-LOGIN", err.message);
      })
      .finally(() => {
        console.log("FINALLY");
      });
  };
  console.log("IS LOADING :", isLoading);

  useEffect(() => {
    resetInput();
  }, []);

  const tryAgainHandler = () => {
    setError(false);
  };

  const closeHandler = () => {
    setError(false);
    props.onClose();
  };
  return (
    <>
      {isLoading && <Loading className={classes.loader} />}
      {error && !isLoading && (
        <ErrorModal onClose={closeHandler} onTryAgain={tryAgainHandler}>
          Wrong Email Address or Password.
        </ErrorModal>
      )}
      {!error && !isLoading && (
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input id="email" ref={emailRef} type="text" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input id="password" ref={passwordRef} type="password" />
          </div>
          <div className={classes.actions}>
            <button
              className={classes.cancel}
              type="button"
              onClick={closeHandler}
            >
              Cancel
            </button>
            <button className={classes.submit} type="submit">
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ReloginModal;
