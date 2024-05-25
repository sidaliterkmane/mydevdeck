import { Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing/components/Landing/Landing";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Failure />} />
      </Routes>
    </>
  );
}

export default App;
