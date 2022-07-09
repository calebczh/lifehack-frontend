// import logo from './logo.svg';
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./store/AuthContext";
import { useContext } from "react";
import Home from "./pages/Home/";
import Image from "./pages/Image/";
import Dispose from "./pages/Dispose/";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Image" element={<Image />} />
        {authCtx.isLoggedIn && <Route path="/Dispose" element={<Dispose />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
