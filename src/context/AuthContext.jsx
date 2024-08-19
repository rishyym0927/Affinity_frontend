import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false); // Initialized to false

  useEffect(() => {
    const userss = localStorage.getItem("User");
    if (userss) {
      setUser(JSON.parse(userss));
    }
  }, []);

  // Logout
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  // Login
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      // Make sure postRequst and baseURL are defined/imported correctly
    //   const response = await postRequst(`${baseURL}/users/login`, loginInfo);

    //   if (response.error) {
    //     setLoginError(response);
    //     setUser(null);
    //   } else {
    //     localStorage.setItem("User", JSON.stringify(response));
    //     setUser(response);
    //   }
      console.log(loginInfo)
      setIsLoginLoading(false);
    },
    [loginInfo]
  );

  // Update login information
  console.log(loginInfo)
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
        setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
