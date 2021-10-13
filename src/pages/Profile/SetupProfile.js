import React, { useContext, useRef, useState } from "react";
import Div1Page from "../../layout/Div1Page";
import UserContext from "../../store/user-context";
import classes from "./SetupProfile.module.css";
import { db } from "../../db/firebase";
import { useHistory } from "react-router";

const SetupProfile = () => {
  const userCtx = useContext(UserContext);
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const nameInput = nameInputRef.current.value;
    const phoneInput = phoneInputRef.current.value;
    userCtx.setUserData({
      uid: userCtx.uid,
      name: nameInput,
      email: userCtx.email,
      phone: phoneInput,
    });
    db.collection("users")
      .doc(userCtx.uid)
      .set({
        uid: userCtx.uid,
        name: nameInput,
        email: userCtx.email,
        phone: phoneInput,
      })
      .then(() => {
        history.replace("/");
        resetInput();
      })
      .catch((err) => setIsLoading(false));
  };

  const resetInput = () => {
    nameInputRef.current.value = "";
    phoneInputRef.current.value = "";
    emailInputRef.current.value = "";
  };

  return (
    <Div1Page>
      <section className={classes.setup}>
        <form onSubmit={submitHandler}>
          <h2>Setup Your Profile</h2>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="name"
              value={userCtx.email}
              ref={emailInputRef}
              disabled
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" ref={phoneInputRef} />
          </div>
          <div className={classes.action}>
            {!isLoading && <button type="submit">Accept</button>}
            {isLoading && <p>Loading...</p>}
          </div>
        </form>
      </section>
    </Div1Page>
  );
};

export default SetupProfile;
