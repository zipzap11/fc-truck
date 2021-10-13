import Div2Page from "../layout/Div2Page";
import both from "./BothDiv2Page.module.css";
import classes from "./SignIn.module.css";
import signLogo from "./assets/sign/sign.png";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import useSign from "../hooks/use-sign";

const SignUp = () => {
  const { fetchUser, error, resetError, isLoading } = useSign("UP");
  const {
    input: emailInput,
    inputIsValid: emailIsValid,
    inputIsInvalid: emailIsInvalid,
    onChangeInputHandler: onChangeEmailHandler,
    onBlurInputHandler: onBlurEmailHandler,
    resetInput: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.includes("."));

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

  const formIsValid = emailIsValid && passwordIsValid && rePasswordIsValid;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const userData = {
        email: emailInput,
        password: passwordInput,
      };
      fetchUser(userData);
      resetEmailInput();
      resetPassword();
      resetRePassword();
    }
  };
  const submitButtonClass = formIsValid ? null : classes.invalid;

  return (
    <Div2Page logo={<img src={signLogo} className={both.logo} alt="sign-up" />}>
      <section
        className={`${both.text} ${classes.text}`}
        style={{ paddingTop: "1rem" }}
        onClick={resetError}
      >
        <h2>Sign Up</h2>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.item}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={emailInput}
              onBlur={onBlurEmailHandler}
              onChange={onChangeEmailHandler}
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
              type="password"
              onBlur={onBlurPasswordHandler}
              onChange={onChangePasswordHandler}
              value={passwordInput}
            />
            {passwordIsInvalid && (
              <span className={classes.error}>
                Please enter more than 5 characters !
              </span>
            )}
          </div>
          <div className={classes.item}>
            <label htmlFor="re-password">Re-Enter Password</label>
            <input
              id="re-password"
              type="password"
              value={rePasswordInput}
              onChange={onChangeRePasswordHandler}
              onBlur={onBlurRePasswordHandler}
            />
            {rePasswordIsInvalid && (
              <span className={classes.error}>
                Please enter same password value !
              </span>
            )}
          </div>
          <div className={classes.action}>
            {error && !isLoading && (
              <span className={classes["sign-error"]}>{error}</span>
            )}
            {!isLoading && (
              <button className={submitButtonClass}>Sign Up</button>
            )}
            {isLoading && <p>Loading...</p>}
          </div>
        </form>
        <div className={classes.new}>
          Already Have Account? <Link to="/sign-in">Sign In</Link>
        </div>
      </section>
    </Div2Page>
  );
};

export default SignUp;
