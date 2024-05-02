import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  UpdateData,
  Logout,
} from "../../redux/rootSlice";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData, Authtoken } = useSelector((state) => state.root);
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer ${Authtoken}` };

  const onFinish = async (values) => {
    console.log(portfolioData.contact._id);
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/portfolio/update-contact",
        {
          ...values,
          _id: portfolioData.contact._id,
        },
        { headers }
      );
      dispatch(HideLoading());

      if (response.data.success) {
        dispatch(UpdateData({ property: "contact", data: response.data.data }));
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            navigate("/");
          }}
        >
          Get portfolio
        </button>
      </div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.contact}
      >
        <Form.Item name="name" label="Name">
          <input placeholder="Name" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <input placeholder="Gender" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <input placeholder="Country" />
        </Form.Item>
        <Form.Item name="github" label="Github">
          <input placeholder="Github" />
        </Form.Item>
        <Form.Item name="linkedin" label="Linked-in">
          <input placeholder="Linked-in" />
        </Form.Item>
        <div className="flex justify-end w-full" label="WelcomeText">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            Save
          </button>

          <button
            className="px-10 py-2 ml-5 bg-primary text-white"
            type="submit"
            onClick={() => {
              window.localStorage.removeItem("token");
              dispatch(Logout());
              // navigate("/admin-Login");
            }}
          >
            Logout
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
