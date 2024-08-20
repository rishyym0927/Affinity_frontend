import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios';
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
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      })
        .then((response) => {
          console.log("Response received");

          // Check if the response was successful
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Log the headers
          console.log([...response.headers]);
        })
        .then((data) => {
          console.log("Response data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //   if (response.error) {
      //     setLoginError(response);
      //     setUser(null);
      //   } else {
      //     localStorage.setItem("User", JSON.stringify(response));
      //     setUser(response);
      //   }
      console.log(loginInfo);
      setIsLoginLoading(false);
    },
    [loginInfo]
  );

  // Update login information
  console.log(loginInfo);
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  //registration
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(null);

  const [registerInfo, setRegisterInfo] = useState({
    first_name: " ",
    last_name: " ",
    email: " ",
    username: " ",
    gender: " ",
    age:Number,
    location: " ",
    openness: " ",
    relation_type: " ",
    interest: " ",
    exp_qual: " ",
    social_habits: " ",
    past_relations: " ",
    password:" ",
    image_url: "xyz",
    score: 0,
  });

  console.log("registerInfo", registerInfo);
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      //to stop refreshing
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      //   console.log("main 2", registerInfo);

      //making the post request to the backend for the registration

      let response = await axios.post(
        "http://localhost:3001/signup",
        registerInfo
      );

      console.log(response);

      //   const response = await postRequst(
      //     `${baseURL}/users/register`,
      //     JSON.stringify(registerInfo)
      //   );
      //   if (response.error) {
      //     setRegisterError(response);
      //   }
      setIsRegisterLoading(false);

      //   localStorage.setItem("User", JSON.stringify(response));
      //   setUser(response);
      console.log("registerUser response", registerInfo);
    },
    [registerInfo]
  );

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

        registerInfo,
        setRegisterInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        setRegisterError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
