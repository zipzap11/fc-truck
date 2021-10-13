import { useContext, useEffect, useState } from "react";
import { useAuth } from "../store/auth-context";
import UserContext from "../store/user-context";
import { db } from "../db/firebase";
import { useHistory } from "react-router";

const useSign = (type) => {
  const authCtx = useAuth();
  const userCtx = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const fetchUser = (userData) => {
    setIsLoading(true);
    if (type === "UP") {
      authCtx
        .signup(userData.email, userData.password)
        .then((res) => {
          const user = res.user;
          userCtx.setUserData({ email: user.email, uid: user.uid });
          history.replace("/profile-setup");
        })
        .catch((err) => {
          setError(err.message);
        });
    } else if (type === "IN") {
      authCtx
        .login(userData.email, userData.password)
        .then(async (res) => {
          const user = res.user;
          const data = (
            await db.collection("users").doc(user.uid).get()
          ).data();
          userCtx.setUserData({ ...data });
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [userCtx.uid]);

  const resetError = () => {
    if (error) {
      setError(null);
    }
  };

  return {
    error: error,
    resetError: resetError,
    isLoading: isLoading,
    fetchUser: fetchUser,
  };
};

export default useSign;
