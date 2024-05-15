import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, UpdateData } from "../../redux/rootSlice";
import axios from "axios";
import { json } from "react-router-dom";
function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData, Authtoken } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    console.log(portfolioData.intro._id);
    try {
      dispatch(ShowLoading());
      const headers = { Authorization: `Bearer ${Authtoken}` };
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/portfolio/update-intro",
        {
          ...values,
          _id: portfolioData.intro._id,
        },
        { headers }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(UpdateData({ property: "intro", data: response.data.data }));
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
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item
          name="welcomeText"
          label="WelcomeText"
          rules={[
            {
              required: true,
              message: "Please Enter Welcome Text",
            },
          ]}
        >
          <input placeholder="Intro" />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="FirstName"
          rules={[
            {
              required: true,
              message: "Please Enter your FirstName",
            },
          ]}
        >
          <input placeholder="FirstName" />
        </Form.Item>
        <Form.Item
          name="middleName"
          label="MiddleName"
          rules={[
            {
              required: true,
              message: "Please Enter your MiddleName",
            },
          ]}
        >
          <input placeholder="MiddleName" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="LastName"
          rules={[
            {
              required: true,
              message: "Please Enter your last name",
            },
          ]}
        >
          <input placeholder="LastName" />
        </Form.Item>
        <Form.Item
          name="caption"
          label="caption"
          rules={[
            {
              required: true,
              message: "Please Add caption",
            },
          ]}
        >
          <input placeholder="caption" />
        </Form.Item>
        <Form.Item
          name="description"
          label="description"
          rules={[
            {
              required: true,
              message: "Please Add description",
            },
          ]}
        >
          <textarea placeholder="description" />
        </Form.Item>
        <div className="flex justify-end w-full" label="WelcomeText">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
