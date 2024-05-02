import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const { portfolioData } = useSelector((state) => state.root);
  const { firstName, lastName, middleName } = portfolioData.intro;
  return (
    <div className="p-5 bg-primary flex justify-between header sm:w-full">
      <h1 className="text-secondary text-4xl font-semibold">{firstName}</h1>
      <h1 className="text-white text-4xl font-semibold">{middleName}</h1>
      <h1 className="text-tertiary text-4xl font-semibold">{lastName}</h1>
    </div>
  );
}

export default Header;
