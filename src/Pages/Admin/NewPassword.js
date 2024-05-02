import { Form, message } from "antd";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function NewPassword() {
  const { Authtoken } = useSelector((state) => state.root);
  const onFinish = async (value) => {
    // const {} =
    if (value.newpassword !== value.confirmpassword) {
      return message.error("Password Missmatched please check");
    } else if (value.currentpassword === value.newpassword) {
      return message.error("Password Already Used");
    } else {
      try {
        const headers = { Authorization: `Bearer ${Authtoken}` };
        const response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/auth/changepassword",
          {
            oldpassword: value.currentpassword,
            newpassword: value.newpassword,
          },
          { headers }
        );

        if (response.data.success) {
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    }
  };
  return (
    <div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="currentpassword" label="Current Password">
          <input placeholder="current password" type="password" />
        </Form.Item>
        <Form.Item name="newpassword" label="New Password">
          <input placeholder="New password" type="password" />
        </Form.Item>
        <Form.Item name="confirmpassword" label="Confirm Password">
          <input placeholder="Confirm Password" type="password" />
        </Form.Item>

        <button className="px-10 py-2 bg-primary text-white" type="submit">
          Update Password
        </button>
      </Form>
    </div>
  );
}

export default NewPassword;
