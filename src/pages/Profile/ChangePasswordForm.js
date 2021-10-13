import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import { useAuth } from "../../store/auth-context";
import classes from "./ReloginModal.module.css";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import Loading from "../../components/Loading";

const ChangePasswordForm = (props) => {
  const authCtx = useAuth();
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    input: passwordInput,
    inputIsValid: passwordIsValid,
    inputIsInvalid: passwordIsInvalid,
    onChangeInputHandler: onChangePasswordHandler,
    onBlurInputHandler: onBlurPasswordHandler,
    resetInput: resetPassword,
  } = useInput((value) => value.trim().length > 5);

  const {
    input: rePasswordInput,
    inputIsValid: rePasswordIsValid,
    inputIsInvalid: rePasswordIsInvalid,
    onChangeInputHandler: onChangeRePasswordHandler,
    onBlurInputHandler: onBlurRePasswordHandler,
    resetInput: resetRePassword,
  } = useInput((value) => value === passwordInput);

  const tryAgainHandler = () => {
    resetPassword();
    resetRePassword();
    setError(false);
    setError(false);
  };

  const closeHandler = () => {
    resetPassword();
    resetRePassword();
    setError(false);
    props.onClose();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onBlurPasswordHandler();
    onBlurRePasswordHandler();
    if (passwordIsValid && rePasswordIsValid) {
      setIsLoading(true);
      authCtx
        .changePassword(passwordInput)
        .then((res) => {
          setIsSuccess(true);
          console.log("SUCCESS CHANGE PASSWORD ", res);
        })
        .catch((err) => {
          setError(true);
          console.log("ERROR CHANGE PASSWORD", err.message);
        })
        .finally(() => {
          console.log("FINALLY");
          setIsLoading(false);
        });
    }
  };

  console.log("IS SUCCESS :", isSuccess);
  return (
    <>
      {isLoading && <Loading className={classes.loader} />}
      {error && !isLoading && (
        <ErrorModal onTryAgain={tryAgainHandler} onClose={closeHandler} />
      )}
      {!error && !isLoading && isSuccess && (
        <SuccessModal onClose={closeHandler} />
      )}
      {!error && !isLoading && !isSuccess && (
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              onChange={onChangePasswordHandler}
              onBlur={onBlurPasswordHandler}
              value={passwordInput}
              type="password"
            />
            {passwordIsInvalid && (
              <p className={classes.invalid}>
                Password must be more than 5 characters
              </p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="repassword">Re-enter Password</label>
            <input
              id="repassword"
              onChange={onChangeRePasswordHandler}
              onBlur={onBlurRePasswordHandler}
              value={rePasswordInput}
              type="password"
            />
            {rePasswordIsInvalid && (
              <p className={classes.invalid}>
                Please enter same password value
              </p>
            )}
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
              Confirm
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ChangePasswordForm;
