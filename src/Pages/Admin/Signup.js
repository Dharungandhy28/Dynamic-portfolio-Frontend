import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReloadData } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { message, Form } from "antd";

function Signup() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    Email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log(values);
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/auth/signup",
        values
      );
      console.log(response);
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

  return (
    <div className="flex justify-center items-center h-screen  bg-primary text-secondary">
      <div
        className="w-96 flex gap-5 p-5 shadow border  border-gray-500 flex-col"
        style={{ backgroundColor: "#383847" }}
      >
        <h1 className="text-2xl">Admin Signup</h1>
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
            <input
              type="email"
              placeholder="Email"
              // className="text-black"
            />
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
            <input
              type="password"
              // value={user.password}
              // onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              // className="text-black"
            />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            label={<span className="text-white">Confirm password</span>}
            rules={[
              {
                required: true,
                message: "Please Confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <input
              type="password"
              // value={user.confirmPassword}
              // onChange={(e) =>
              //   setUser({ ...user, confirmPassword: e.target.value })
              // }
              placeholder="Confirm Password"
              // className="text-black"
            />
          </Form.Item>
          <button className="bg-primary text-white p-2 mb-2">Sign UP</button>
          <p className="text-secondary text-sm">
            Already have account&nbsp;
            <Link to="/admin-login" className="text-blue-300">
              click here to login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
