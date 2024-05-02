import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import aboutimage from "../../images/about.png";
import { useSelector } from "react-redux";

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root);

  const { about } = portfolioData;
  const { imgurl, description1, description2, skills } = about;

  const start = imgurl.indexOf("d/") + 2;
  const end = imgurl.indexOf("/view");
  const formatterimgurl = `https://drive.google.com/thumbnail?id=${imgurl.slice(
    start,
    end
  )}&sz=w600`;
  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex w-full items-center sm:flex-col">
        <div>
          <img src={formatterimgurl} alt="" />

          {/* <img
            src={
              "https://drive.google.com/file/d/1kLqiRerGR6Cle2mkOgoDw06H5d7GdQrX/view"
            }
          /> */}
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{description1}</p>
          <p className="text-white">{description2}</p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-tertiary text=xl">
          Here are a few technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skills, index) => (
            <div className="border border-tertiary py-3 px-10">
              <h1 className="text-white">{skills}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
