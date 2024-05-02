import React from "react";
import SectionTitle from "../../Components/SectionTitle";

import { useSelector } from "react-redux";
function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);

  const projects = portfolioData.project;
  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#4290a065] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#2e47a331] py-3"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm: flex-col">
          <img
            src={projects[selectedItemIndex].image}
            alt=""
            className="h-30 w-40"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-xl">
            {projects[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-xl">
            {projects[selectedItemIndex].description}
          </h1>

          <h1 className="text-white text-xl">
            {projects[selectedItemIndex].link}
          </h1>
          <h1 className="text-tertiary text-xl">
            {projects[selectedItemIndex].technology.join(" , ")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Projects;
