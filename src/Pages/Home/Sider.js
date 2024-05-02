import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sider() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div className="fixed left-0 bottom-0">
      <div className="flex flex-col items-center px-10 sm:static">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={`mailto:${portfolioData.email}`} target="_blank">
            <i class="ri-mail-line text-gray-400 "></i>
          </Link>

          <Link to={portfolioData.contact.linkedin} target="_blank">
            <i class="ri-linkedin-box-fill text-gray-400 "></i>
          </Link>
          <Link to={portfolioData.contact.github} target="_blank">
            <i class="ri-github-fill text-gray-400"></i>
          </Link>
        </div>
        <div className="w-[1px] h-32 bg-[#1f638ee2] sm:hidden"></div>
      </div>
    </div>
  );
}

export default Sider;
