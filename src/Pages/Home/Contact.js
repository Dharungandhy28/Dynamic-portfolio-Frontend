import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import call from "../../images/call.png";
import { useSelector } from "react-redux";

function Contact() {
  const { loading, portfolioData } = useSelector((state) => state.root);

  const { contact } = portfolioData;

  return (
    <div>
      <SectionTitle title="ContactMe" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" &&
              key !== "__v" &&
              key !== "github" &&
              key !== "linkedin" &&
              key !== "userId" && (
                <p className="ml-5">
                  <span className="text-tertiary">{key}:</span>
                  <span className="text-tertiary">{contact[key]}</span>
                </p>
              )
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px] w-1/2">
          <img src={call} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
