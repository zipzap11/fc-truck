import classes from "./Profile.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import Div1Page from "../../layout/Div1Page";
import ChangePasswordModal from "./ChangePasswordModal";
import Avatar from "../../components/assets/avatar.png";
import UserContext from "../../store/user-context";
import { useAuth } from "../../store/auth-context";
import { useHistory } from "react-router";
import { db, storage } from "../../db/firebase";
import ChangeProfileModal from "./ChangeProfileModal";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const authCtx = useAuth();
  const history = useHistory();
  const [name, setName] = useState(userCtx.name);
  const [email, setEmail] = useState(userCtx.email);
  const [phone, setPhone] = useState(userCtx.phone);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] =
    useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfileChanged, setUserProfileChanged] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const fileInputRef = useRef();
  useEffect(() => {
    setName(userCtx.name);
    setEmail(userCtx.email);
    setPhone(userCtx.phone);
  }, [userCtx.name, userCtx.email, userCtx.phone]);

  const changeNameHandler = (event) => {
    setUserProfileChanged(true);
    setName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setUserProfileChanged(true);
    setEmail(event.target.value);
  };

  const changePhoneHandler = (event) => {
    setUserProfileChanged(true);
    setPhone(event.target.value);
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  const openChangeProfileModalHandler = () => {
    setIsChangeProfileModalOpen(true);
  };
  const closeChangeProfileModalHandler = () => {
    console.log("CLOSED");
    setIsChangeProfileModalOpen(false);
  };

  const saveChangesHandler = () => {
    openChangeProfileModalHandler();
    setIsLoading(true);
    db.collection("users")
      .doc(userCtx.uid)
      .set({
        name: name,
        email: email,
        phone: phone,
        uid: userCtx.uid,
      })
      .then((res) => {
        userCtx.setUserData({ name: name, email: email, phone: phone });
        setIsLoading(false);
        setIsError(false);
        console.log("SUCCESS :", res);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log("ERROR :", err.message);
      });
  };

  useEffect(() => {
    if (
      name === userCtx.name &&
      email === userCtx.email &&
      phone === userCtx.phone
    ) {
      setUserProfileChanged(false);
    }
  }, [email, name, phone, userCtx.email, userCtx.name, userCtx.phone]);

  const openChangePasswordModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeChangePasswordModalHandler = () => {
    setIsModalOpen(false);
  };

  const fileInputClickTrigger = () => {
    console.log("TRIGGERED");
    console.log(fileInputRef.current);
    fileInputRef.current.click();
  };

  const profilePhotoChangeHandler = (event) => {
    console.log("CHANGED");
    if (event.target.files[0]) {
      setFileUploadLoading(true);
      storage
        .ref(`profile-pictures/${userCtx.uid}`)
        .put(event.target.files[0])
        .on(
          "state_changed",
          (snapshot) => {
            let a = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(a);
          },
          (error) => {
            setFileUploadLoading(false);
            console.log(error.message);
          },
          () => {
            storage
              .ref("profile-pictures")
              .child(userCtx.uid)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                userCtx.setUserData({ profilePicture: url });
              });
            setFileUploadLoading(false);
          }
        );
    }
  };

  let changeProfileModalContent = isError
    ? "Something went wrong"
    : "SuccessFully Change Your Profile";
  return (
    <Div1Page>
      {isChangeProfileModalOpen && (
        <ChangeProfileModal
          onClose={closeChangeProfileModalHandler}
          isError={isError}
          isLoading={isLoading}
          content={changeProfileModalContent}
        />
      )}
      {isModalOpen && (
        <ChangePasswordModal onClose={closeChangePasswordModalHandler} />
      )}
      <section className={classes.profile}>
        <h2>My Profile</h2>
        <div className={classes["profile-data"]}>
          <div className={classes.left}>
            <div className={classes.wrapper}>
              <img
                src={userCtx.profilePicture ? userCtx.profilePicture : Avatar}
                alt="avatar"
                className={classes.avatar}
              />
              {!fileUploadLoading && (
                <button onClick={fileInputClickTrigger}>Change Photo</button>
              )}
              {fileUploadLoading && <p>Loading...</p>}
              <input
                className={classes.none}
                type="file"
                onChange={profilePhotoChangeHandler}
                ref={fileInputRef}
              />
            </div>
            {/* <p className={classes.saldo}>Saldo : Rp 1.200.000</p> */}
          </div>
          <div className={classes.data}>
            <div className={classes.control}>
              <label>Name :</label>
              <input value={name} onChange={changeNameHandler}></input>
            </div>
            <div className={classes.control}>
              <label>Email :</label>
              <input value={email} onChange={changeEmailHandler}></input>
            </div>
            <div className={classes.control}>
              <label>Phone Number :</label>
              <input value={phone} onChange={changePhoneHandler}></input>
            </div>
            <div className={classes.actions}>
              <button
                className={classes.btn}
                onClick={openChangePasswordModalHandler}
              >
                Change Password
              </button>
              <button className={classes.btn} onClick={logoutHandler}>
                Logout
              </button>
              {userProfileChanged && (
                <button onClick={saveChangesHandler} className={classes.btn}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Div1Page>
  );
};

export default Profile;
