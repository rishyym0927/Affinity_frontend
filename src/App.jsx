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
import Custom404 from "./pages/Custom404";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <AIChatContextProvider userss={user}>
        <ExtraContextProvider user={user}>
          <ToastContainer />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/room/:roomId' element={<RoomPage />}/>
            <Route path="/coderun" element={user ? <CodeRun /> : <Landing />} />

            <Route
              path="/dashboard"
              element={
                user && user.gender !== "Male" ? (
                  <Layout1>
                    <Dashboard />
                  </Layout1>
                ) : (
                  <Landing />
                )
              }
            />

            <Route
              path="/matches"
              element={
                user ? (
                  <Layout1>
                    <Matches />
                  </Layout1>
                ) : (
                  <Landing />
                )
              }
            />

            <Route
              path="/request"
              element={
                user && user.gender !== "Female" ? (
                  <Layout1>
                    <Requests />
                  </Layout1>
                ) : (
                  <Landing />
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
                  <Landing />
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
                  <Landing />
                )
              }
            />

            {/* Add a catch-all route for 404 errors */}
            <Route path="*" element={<Custom404/>} />
          </Routes>
        </ExtraContextProvider>
      </AIChatContextProvider>
    </>
  );
};

export default App;