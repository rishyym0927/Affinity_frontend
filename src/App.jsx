import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout1 from "./Layout1";

import Queue from "./pages/Queue";
import Chatbot from "./pages/Chatbot";
import { AIChatContextProvider } from "./context/AIChatContext";
import { ExtraContextProvider } from "./context/ExtraContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Requests from "./pages/Requests";
import CodeRun from "./pages/CodeRun";
import Matches from "./pages/Matches";
import RoomPage from "./pages/Room";
import Denied from "./pages/Denied";
import Chat from "./pages/Matches";


/* TO  ACCESS ANY PAGE YOU CAN REMOVE THE RESTRICTIONS BY SIMPLY REPLACING THE 
LANDING ELEMENT BY THE RESPECTIVE ONE
*/

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <AIChatContextProvider userss={user}>
        <ExtraContextProvider user={user}>
          {/* ToastContainer to handle toast notifications */}
          <ToastContainer />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/coderun" element={user ? <CodeRun /> : <Denied />} />

            {/* Restrict Access to dashboard for Males */}
            <Route
              path="/dashboard"
              element={
                user && user.gender === "Female" ? (
                  <Layout1>
                    <Dashboard />
                  </Layout1>
                ) : (
                  <Denied />
                )
              }
            />

            <Route
              path="/queue"
              element={
                user && user.gender === "Female" ? (
                  <Layout1>
                    <Queue />
                  </Layout1>
                ) : (
                  <Denied />
                )
              }
            />

            {/* Restrict Access for Females */}
            <Route
              path="/request"
              element={
                user && user.gender === "Male" ? (
                  <Layout1>
                    <Requests />
                  </Layout1>
                ) : (
                  <Denied />
                )
              }
            />

            {/* Restricted Access for Unauthenticated Users */}
            <Route
              path="/matches"
              element={
                user ? (
                  <Layout1>
                    <Matches />
                  </Layout1>
                ) : (
                  <Denied />
                )
              }
            />
            <Route
              path="/chatbot"
              element={
                user ? (
                  <Layout1>
                    <Chatbot />
                  </Layout1>
                ) : (
                  <Denied />
                )
              }
            />

            <Route path="/denied" element={<Denied />} />
          </Routes>
        </ExtraContextProvider>
      </AIChatContextProvider>
    </>
  );
};

export default App;
