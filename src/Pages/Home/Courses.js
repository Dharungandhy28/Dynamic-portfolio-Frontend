import React from "react";
import SectionTitle from "../../Components/SectionTitle";

import { useSelector } from "react-redux";
function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);

  const courses = portfolioData.course;
  return (
    <div>
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#4290a065] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((course, index) => (
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
                {course.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm: flex-col">
          <img
            src={courses[selectedItemIndex].image}
            alt=""
            className="h-30 w-40"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-xl">
            {courses[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-xl">
            {courses[selectedItemIndex].description}
          </h1>

          <h1 className="text-white text-xl">
            {courses[selectedItemIndex].link}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Courses;
