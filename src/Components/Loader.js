import React from "react";
import { useSelector } from "react-redux";

function Loader() {
  const { portfolioData } = useSelector((state) => state.root);
  const { firstName, lastName, middleName } = portfolioData.intro;
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]">
      <div className="flex gap-5 text-6xl font-semibold">
        <h1 className="text-secondary M">{firstName[0]}</h1>
        <h1 className="text-white D">{middleName[0]}</h1>
        <h1 className="text-tertiary G">{lastName[0]}</h1>
      </div>
    </div>
  );
}

export default Loader;
