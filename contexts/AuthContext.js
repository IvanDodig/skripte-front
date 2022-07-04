import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [cookie, setCookie] = useCookies(["loginUser"]);
  const [loginUser, setLoginUser] = useState(cookie.loginUser);

  console.log(loginUser);

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
