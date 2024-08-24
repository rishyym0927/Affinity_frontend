import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./chat.css";
import Landing from "./pages/Landing.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SocketProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SocketProvider>
  </BrowserRouter>
);
