import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, UpdateData } from "../../redux/rootSlice";
import axios from "axios";
import { json } from "react-router-dom";
function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData, Authtoken } = useSelector((state) => state.root);
  const headers = { Authorization: `Bearer ${Authtoken}` };
  const onFinish = async (values) => {
    console.log(portfolioData.about._id);
    try {
      const tempskills = values.skills.split(",");
      values.skills = tempskills;
      dispatch(ShowLoading());
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/portfolio/update-about",
        {
          ...values,
          _id: portfolioData.about._id,
        },
        { headers }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(UpdateData({ property: "about", data: response.data.data }));
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
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(" , "),
        }}
      >
        <Form.Item name="imgurl" label="Google-drive-url">
          <input placeholder="imgurl" />
        </Form.Item>
        <Form.Item name="description1" label="Description1">
          <textarea placeholder="description1" />
        </Form.Item>
        <Form.Item name="description2" label="Description2">
          <textarea placeholder="description2" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <textarea placeholder="skills" />
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

export default AdminAbout;
