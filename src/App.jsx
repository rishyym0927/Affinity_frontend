// App.js
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout1 from "./Layout1";
import Search from "./pages/Search";
import Queue from "./pages/Queue";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route for Dashboard */}
        <Route 
          path="/dashboard" 
          element={user ?
            <Layout1>
              <Dashboard />
            </Layout1> :<Landing />
          } 
        />
        <Route
        path="/search"
        element={
          user ?
          <Layout1>
            <Search />
          </Layout1> :<Landing />
        }
      />

<Route
        path="/queue"
        element={
          user ?
          <Layout1>
            <Queue />
          </Layout1> :<Landing />
        }
      />

      </Routes>
    </>
  );
};

export default App;
