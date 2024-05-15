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
function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData, Authtoken } = useSelector((state) => state.root);
  const projects = portfolioData.project;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);
  const [type, setType] = React.useState("add");
  const headers = { Authorization: `Bearer ${Authtoken}` };
  const onFinish = async (values) => {
    try {
      const tempTechnologies = values.technologies.split(",");
      values.technologies = tempTechnologies;

      dispatch(ShowLoading());
      let response;
      if (selectedItemEdit) {
        response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/portfolio/update-project",
          {
            ...values,
            technology: values.technologies,
            _id: selectedItemEdit._id,
          },
          { headers }
        );
      } else {
        response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/portfolio/add-project",
          {
            ...values,
            technology: values.technologies,
          },
          { headers }
        );
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(UpdateData({ property: "project", data: response.data.data }));
        setShowAddEditModal(false);
        setSelectedItemEdit(null);
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

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/api/portfolio/delete-project",
        {
          _id: item._id,
        },
        { headers }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(DeleteData({ property: "project", id: item._id }));
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
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
            <hr />
            <img src={project.image} alt="" className="h-60 w-80" />
            <h1>Role: {project.title}</h1>
            <h1>{project.description}</h1>
            <h1>{project.technology.join(" , ")}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => {
                  onDelete(project);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemEdit(project);
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
          title={selectedItemEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemEdit(null);
          }}
        >
          <Form
            layout="vertical"
            initialValues={
              {
                ...selectedItemEdit,
                technologies: selectedItemEdit?.technology?.join(" , "),
              } || {}
            }
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please Enter Title",
                },
              ]}
            >
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image Url"
              rules={[
                {
                  required: true,
                  message: "Please Add Image",
                },
              ]}
            >
              <input placeholder="Image" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please Add description",
                },
              ]}
            >
              <textarea placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="link"
              label="Link"
              rules={[
                {
                  required: true,
                  message: "Please Add Link",
                },
              ]}
            >
              <input placeholder="Link" />
            </Form.Item>
            <Form.Item
              name="technologies"
              label="Technologies"
              rules={[
                {
                  required: true,
                  message: "Please Enter Technologies",
                },
              ]}
            >
              <textarea placeholder="Technologies" />
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

export default AdminProjects;
