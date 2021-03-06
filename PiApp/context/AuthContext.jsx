import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, checkIsAuthenticated } from "../services/auth";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const authLogin = async (email, password) => {
    return login(email, password)
        .then((result) => {
            if (result.success) {
                setUser(result.user);
                storeUser(result.user);
                setIsSignedIn(true);
                //setIsAuthenticated(true);
                return true;
            } else {
                //setIsAuthenticated(false);
                setIsSignedIn(false);
                return false;
            }
        })
        .catch(error => {
            //setIsAuthenticated(false)
            setIsSignedIn(false);
            return false;
        })
}

  const authLogout = () => {
    console.log("logging out");
    setIsSignedIn(false);
    AsyncStorage.clear();
    return new Promise((resolve, reject) => resolve(true));
  };

  

  const storeUser = async (user) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {
      console.log("Async Storage Error");
      throw e;
    }
  };

  const checkAuth = async () => {
    //setIsAuthenticated(true);
    checkIsAuthenticated()
        .then((result) => {
            //console.log("Result auth", result);
            if (result.success) {
                setUser(result.user);
                setIsSignedIn(true);
            } else {
              setIsSignedIn(false);
                return false;
            }
        })
        .catch(err => {
          console.log(err);
            setIsSignedIn(false);
        })  
}

  return (
    <AuthContext.Provider
      value={{
        authLogin,
        authLogout,
        storeUser,
        checkAuth,
        user,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
