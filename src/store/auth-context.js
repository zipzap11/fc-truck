import { useContext, createContext, useState, useEffect } from "react";
import { auth, db, storage } from "../db/firebase";
import UserContext from "./user-context";

const AuthContext = createContext({
  currentUser: null,
  isLoading: true,
  login: (email, password) => {},
  logout: () => {},
  signup: (email, password) => {},
  changePassword: (newPassword) => {},
  changeEmail: (newEmail) => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const { setUserData, resetUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubs = auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      console.log("SETTING USER.....");
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubs;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        setIsLoading(true);
        const userData = (
          await db.collection("users").doc(currentUser.uid).get()
        ).data();
        storage
          .ref("profile-pictures")
          .child(currentUser.uid)
          .getDownloadURL()
          .then((res) => {
            console.log("RES", res);
            setUserData({ ...userData, profilePicture: res });
          })
          .catch((err) => {
            console.log("ERR", err);
            setUserData({ ...userData, profilePicture: null });
          });
      };
      console.log("SETTING USER DATA");
      getData();
      setIsLoading(false);
    }
  }, [setUserData, currentUser]);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    resetUserData();
    return auth.signOut();
  };

  const changePassword = (newPassword) => {
    return auth.currentUser.updatePassword(newPassword);
  };

  const changeEmail = (newEmail) => {
    return auth.currentUser.updateEmail(newEmail);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    isLoading,
    changePassword,
    changeEmail,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
