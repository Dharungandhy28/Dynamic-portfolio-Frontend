import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ReloadData, Login as login } from "../../redux/rootSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, message } from "antd";
function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/auth/signin",
        values
      );
      if (response.data.message === "Login successfully") {
        message.success(response.data.message, 3, () => {
          dispatch(
            login({ ...response.data, callback: () => navigate("/admin") })
          );
          dispatch(ReloadData(false));
        });
      } else {
        message.error("Login failed please try again");
      }
    } catch (error) {
      message.error("Login failed please try again");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary text-secondary">
      <div
        className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col"
        style={{ backgroundColor: "#383847" }}
      >
        <h1 className="text-2xl">Admin Login</h1>

        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<span className="text-white">Email</span>}
            rules={[
              {
                required: true,
                message: "Please Enter Email",
              },
            ]}
          >
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className="text-white">Password</span>}
            rules={[
              {
                required: true,
                message: "Please Enter Password",
              },
            ]}
          >
            <input type="password" placeholder="Password" />
          </Form.Item>
          <button className=" bg-primary  text-white p-2 mb-2 ">Login</button>
          <p className="text-secondary text-sm">
            Did'nt have account&nbsp;
            <Link to="/admin-signup" className="text-blue-300">
              click here to Signup
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
