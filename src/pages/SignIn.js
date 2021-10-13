import both from "./BothDiv2Page.module.css";
import Div2Page from "../layout/Div2Page";
import classes from "./SignIn.module.css";
import signLogo from "./assets/sign/sign.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import useInput from "../hooks/use-input";
import useSign from "../hooks/use-sign";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const {
    input: emailInput,
    inputIsValid: emailIsValid,
    inputIsInvalid: emailIsInvalid,
    onChangeInputHandler: onChangeEmailHandler,
    onBlurInputHandler: onBlurEmailHandler,
    resetInput: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.includes("."));
  const { fetchUser, error, resetError, isLoading } = useSign("IN");

  const onChangePasswordHandler = (event) => {
    onBlurEmailHandler();
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    onBlurEmailHandler();
    if (emailIsValid) {
      const userData = {
        email: emailInput,
        password: password,
      };
      fetchUser(userData);
      resetEmailInput();
      setPassword("");
    }
  };

  return (
    <Div2Page logo={<img src={signLogo} className={both.logo} alt="sign-in" />}>
      <section className={`${both.text} ${classes.text}`} onClick={resetError}>
        <h2>Sign In</h2>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.item}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type=""
              value={emailInput}
              onChange={onChangeEmailHandler}
              onBlur={onBlurEmailHandler}
            />
            {emailIsInvalid && (
              <span className={classes.error}>
                Please enter a valid email address !
              </span>
            )}
          </div>
          <div className={classes.item}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={onChangePasswordHandler}
              type="password"
            />
          </div>
          <div className={classes}>
            {error && !isLoading && (
              <span className={classes["sign-error"]}>{error}</span>
            )}
            <p>Forget Password?</p>
            {!isLoading && <button>Sign in</button>}
            {isLoading && <p style={{ fontSize: "1.5em" }}>Loading...</p>}
          </div>
        </form>
        <div className={classes.new}>
          <span>
            New User? <Link to="/sign-up">Sign Up</Link>
          </span>
          {isLoading && <p>Loading...</p>}
        </div>
      </section>
    </Div2Page>
  );
};

export default SignIn;
