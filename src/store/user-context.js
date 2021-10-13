import React, { useCallback, useState } from "react";

const UserContext = React.createContext({
  uid: "",
  name: "",
  email: "",
  phone: "",
  profilePicture: "",
  setUserData: (userData) => {},
  resetUserData: () => {},
});

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    uid: "",
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  const setHandler = useCallback((userData) => {
    setUserData((prev) => {
      return { ...prev, ...userData };
    });
  }, []);

  const resetHandler = () => {
    setUserData({
      uid: "",
      name: "",
      email: "",
      phone: "",
      profilePicture: "",
    });
  };

  const ctxValue = {
    uid: userData.uid,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    profilePicture: userData.profilePicture,
    setUserData: setHandler,
    resetUserData: resetHandler,
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
