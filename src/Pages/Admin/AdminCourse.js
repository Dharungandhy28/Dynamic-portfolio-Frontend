import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, message } from "antd";
import {
  DeleteData,
  HideLoading,
  ReloadData,
  ShowLoading,
  UpdateData,
} from "../../redux/rootSlice";
import axios from "axios";
const defaultform = {
  period: "",
  company: "",
  title: "",
  description: "",
};
function AdminCourse() {
  const dispatch = useDispatch();
  const { portfolioData, Authtoken } = useSelector((state) => state.root);
  const courses = portfolioData.course;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);
  const [type, setType] = React.useState("add");
  const [form] = Form.useForm();
  const headers = { Authorization: `Bearer ${Authtoken}` };
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemEdit) {
        response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/portfolio/update-course",
          {
            ...values,

            _id: selectedItemEdit._id,
          },
          { headers }
        );
      } else {
        response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/portfolio/add-course",
          {
            ...values,
          },
          { headers }
        );
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(UpdateData({ property: "course", data: response.data.data }));
        setShowAddEditModal(false);
        setSelectedItemEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/portfolio/delete-course",
        {
          _id: item._id,
        },
        { headers }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(DeleteData({ property: "course", id: item._id }));
        dispatch(HideLoading());
        dispatch(ReloadData(true));
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
            setSelectedItemEdit(null);
            setShowAddEditModal(true);
            setType("add");
          }}
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {courses.map((course, index) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col gap-5"
            key={index}
          >
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>
            <hr />
            <img src={course.image} alt="" className="h-60 w-80 rounded" />

            <h1>{course.description}</h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => {
                  onDelete(course);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemEdit(course);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemEdit ? "Edit Course" : "Add Course"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={
              {
                ...selectedItemEdit,
              } || {}
            }
            onFinish={onFinish}
          >
            <Form.Item name="title" label="Title">
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image Url">
              <input placeholder="Image" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea placeholder="Description" />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <input placeholder="Link" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2">
                {selectedItemEdit ? "Updated" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminCourse;
