import { createContext, useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RUST_MAIN_URL } from "../utils/constant";

import clickSound from '../assets/login.mp3';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const audioRef = useRef(new Audio(clickSound));

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();

  // Check for stored user data in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Safely parse the stored user
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Logout function
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    toast.success("Logged out successfully!", {
      theme: "dark",
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/");
  }, []);

  // Login function
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      try {
        const response = await fetch(`${RUST_MAIN_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(loginInfo),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem("User", JSON.stringify(data)); // Store user data in local storage
        setUser(data); // Update state with user data

        // console.log("User successfully logged in:", data); // Log success message
        audioRef.current.play();
        toast.success("Login successful!", {
          theme: "dark",
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/chatbot"); // Redirect to dashboard
      } catch (error) {
        setLoginError(error.message);
        setUser(null); // Reset user state in case of error
        // console.error("Login error:", error.message); // Log error message
        toast.error(`Login failed: ${error.message}`, {
          theme: "dark",
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfo, navigate]
  );

  // Update login information
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // Registration state and functions
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    gender: "",
    age: null,
    location: "",
    openness: "",
    relation_type: "",
    interests: "",
    exp_qual: "",
    social_habits: "",
    past_relations: "",
    password: "",
    image_url: "",
    score: 0,
  });

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // Register function
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await axios.post("http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/signup", registerInfo);

        localStorage.setItem("User", JSON.stringify(response.data)); // Store user data in local storage
        setUser(response.data); // Update state with user data

        // console.log("User successfully registered:", response.data); // Log success message
        toast.success("Registration successful!", {
          theme: "dark",
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login"); // Redirect to dashboard
      } catch (error) {
        setRegisterError(error.response?.data?.message || error.message);
        // console.error("Registration error:", error.response?.data?.message || error.message); // Log error message
        toast.error(`Registration failed: ${errorMessage}`, {
          theme: "dark",
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsRegisterLoading(false);
      }
    },
    [registerInfo, navigate]
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
