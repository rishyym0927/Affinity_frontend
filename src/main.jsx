import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./chat.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";
import { PeroxoWebSocketProvider } from "./context/PeroxoSocket.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SocketProvider>
      <AuthContextProvider>
        <PeroxoWebSocketProvider>
        <App />
        </PeroxoWebSocketProvider>
      </AuthContextProvider>
    </SocketProvider>
  </BrowserRouter>
);
