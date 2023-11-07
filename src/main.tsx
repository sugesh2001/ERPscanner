import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FrappeProvider } from "frappe-react-sdk";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ""}>
    <App />
  </FrappeProvider>
  // </React.StrictMode>
);
