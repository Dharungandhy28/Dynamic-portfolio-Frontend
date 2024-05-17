import React from "react";
import Header from "../../Components/Header";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";

import { Tabs } from "antd";
import { useSelector } from "react-redux";
import AdminExperience from "./AdminExperience";
import AdminProjects from "./AdminProjects";
import AdminCourse from "./AdminCourse";
import AdminContact from "./AdminContact";
import NewPassword from "./NewPassword";
const { TabPane } = Tabs;

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experience",
      children: <AdminExperience />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Courses",
      children: <AdminCourse />,
    },
    {
      key: "6",
      label: "Contact",
      children: <AdminContact />,
    },
    {
      key: "7",
      label: " Change Password",
      children: <NewPassword />,
    },
  ];
  return (
    <div>
      <Header className="w-full" />
      <div className="flex gap-10 items-center px-5 py-2">
        <h1 className="text-3xl text-primary">Admin Page</h1>
        <div className="w-40 h-[1px] bg bg-gray-700"></div>
      </div>
      {portfolioData && (
        <div className=" px-5 pb-10">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      )}
    </div>
  );
}

export default Admin;
