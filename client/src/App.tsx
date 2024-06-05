import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/UserContext";

import "./App.css";
import Landing from "./pages/Landing/components/Landing/Landing";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="app bg-neutral-950">
      <UserContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Failure />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
