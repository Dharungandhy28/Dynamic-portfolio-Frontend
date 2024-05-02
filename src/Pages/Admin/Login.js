import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ReloadData, Login as login } from "../../redux/rootSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const apilogin = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/auth/signin",
        {
          email: user.username,
          password: user.password,
        }
      );

      dispatch(login({ ...response.data, callback: () => navigate("/admin") }));
      dispatch(ReloadData(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    apilogin();
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary text-secondary">
      <div
        className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col"
        style={{ backgroundColor: "#383847" }}
      >
        <h1 className="text-2xl">Admin Login</h1>
        <hr />
        <input
          type="email"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="text-black"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="text-black"
        />
        <button
          className=" text-primary p-2 font-bold rounded-lg"
          style={{ backgroundColor: "#bdbdc2" }}
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-secondary text-sm">
          Did'nt have account&nbsp;
          <Link to="/admin-signup" className="text-blue-300">
            click here to Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
