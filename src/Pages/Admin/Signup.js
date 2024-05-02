import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReloadData } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

function Signup() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    Email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const apisignup = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/auth/signup",
        {
          email: user.Email,
          password: user.password,
        }
      );

      if (response.data.success) {
        message.success(response.data.message, 3, () =>
          navigate("/admin-login")
        );
      } else {
        message.error("signup failed please try again");
      }
    } catch (error) {
      message.error("signup failed please try again");
    }
  };
  const handleSignup = () => {
    apisignup();
  };
  return (
    <div className="flex justify-center items-center h-screen  bg-primary text-secondary">
      <div
        className="w-96 flex gap-5 p-5 shadow border  border-gray-500 flex-col"
        style={{ backgroundColor: "#383847" }}
      >
        <h1 className="text-2xl">Admin Signup</h1>
        <hr />
        <input
          type="email"
          value={user.Email}
          onChange={(e) => setUser({ ...user, Email: e.target.value })}
          placeholder="Email"
          className="text-black"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="text-black"
        />
        <input
          type="password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          placeholder="Confirm Password"
          className="text-black"
        />
        <button className="bg-primary text-white p-2" onClick={handleSignup}>
          Sign UP
        </button>
        <p className="text-secondary text-sm">
          Already have account&nbsp;
          <Link to="/admin-login" className="text-blue-300">
            click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
