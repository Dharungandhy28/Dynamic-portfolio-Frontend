import React, { useEffect, useState } from "react";
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
function AdminExperience() {
  const dispatch = useDispatch();
  const { portfolioData, Authtoken } = useSelector((state) => state.root);
  const experiences = portfolioData.experience;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);
  const [type, setType] = React.useState("add");
  const headers = { Authorization: `Bearer ${Authtoken}` };
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemEdit) {
        response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/portfolio/update-experience",
          {
            ...values,
            _id: selectedItemEdit._id,
          },
          { headers }
        );
      } else {
        response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/portfolio/add-experience",
          {
            ...values,
          },
          { headers }
        );
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(
          UpdateData({ property: "experience", data: response.data.data })
        );
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
        process.env.REACT_APP_BASEURL + "/api/portfolio/delete-experience",
        {
          _id: item._id,
        },
        { headers }
      );
      dispatch(HideLoading());
      if (response.data.message) {
        message.success(response.data.message);
        dispatch(DeleteData({ property: "experience", id: item._id }));
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

  useEffect(() => {}, [showAddEditModal]);

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
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experiences.map((experience) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">
              {experience.period}
            </h1>
            <hr />
            <h1>company: {experience.company}</h1>
            <h1>Role: {experience.title}</h1>
            <h1>{experience.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemEdit(experience);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && <p>No Experience Added</p>}
      </div>

      {(type === "add" || selectedItemEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemEdit(null);
          }}
        >
          <Form
            layout="vertical"
            initialValues={selectedItemEdit}
            onFinish={onFinish}
          >
            <Form.Item
              name="period"
              label="Period"
              rules={[
                {
                  required: true,
                  message: "Please Add Period",
                },
              ]}
            >
              <input placeholder="Period" />
            </Form.Item>
            <Form.Item
              name="company"
              label="Company"
              rules={[
                {
                  required: true,
                  message: "Please Enter Company Name",
                },
              ]}
            >
              <input placeholder="Company" />
            </Form.Item>
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

export default AdminExperience;
