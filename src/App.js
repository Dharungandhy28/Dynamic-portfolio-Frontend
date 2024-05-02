import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import { useEffect, useRef, useState } from "react";
import Loader from "./Components/Loader";
import axios from "axios";
import { ReloadData, SetportfolioData } from "./redux/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./Pages/Admin";
import Login from "./Pages/Admin/Login";
import Signup from "./Pages/Admin/Signup";

const PrivateRoute = ({ Component }) => {
  const { isLogin } = useSelector((state) => state.root);
  return isLogin ? <Component /> : <Navigate to="/admin-Login" />;
};
function App() {
  const { loading } = useSelector((state) => state.root);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<PrivateRoute Component={Home} />} />
        <Route path="/share/:id" element={<Home />} />
        <Route path="/admin" element={<PrivateRoute Component={Admin} />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
