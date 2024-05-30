import { Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing/components/Landing/Landing";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Login from "./pages/Login";

function App() {
  return (
    <div className="app bg-neutral-950">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Failure />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
