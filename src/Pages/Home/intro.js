import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Typography } from "antd";

const { Paragraph, Text, Button } = Typography;

function Intro({ pdfRef }) {
  const { loading, portfolioData, isLogin } = useSelector(
    (state) => state.root
  );
  const navigate = useNavigate();

  const { intro } = portfolioData;
  const { firstName, middleName, lastName, welcomeText, description, caption } =
    intro;
  const location = useLocation();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      // pdf.addImage(
      //   imgData,
      //   "PNG",
      //   imgX,
      //   imgY,
      //   imgWidth * ratio,
      //   imgHeight * ratio
      // );

      pdf.addImage(
        imgData,

        "PNG",

        0,

        0,

        imgWidth * ratio,

        imgHeight * ratio,

        undefined,

        "FAST"
      );
      pdf.save(`${firstName} ${middleName} ${lastName}_portfolio.pdf`);
    });
  };

  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      <h1 className="text-white">{welcomeText || ""}</h1>
      <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
        {firstName || ""}&nbsp;
        {middleName || ""}&nbsp;
        {lastName || ""}
      </h1>
      <h1 className="text-7xl sm:text-3xl text-white font-semibold">
        {caption || ""}
      </h1>
      <p className=" text-white w-2/3">{description || ""}</p>
      {isLogin && (
        <button
          className="border-2 border-tertiary text-white px-10 py-3"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Edit Profile
        </button>
      )}
      <button
        className="border-2 border-tertiary text-white px-10 py-3"
        onClick={downloadPDF}
      >
        Download Portfolio
      </button>

      <Paragraph
        className="border-2 border-tertiary text-white px-10 py-3"
        style={{ color: "white" }}
        copyable={{
          text: `${window.location.origin.toString()}/share/${
            portfolioData._id
          }`,
        }}
      >
        Share
      </Paragraph>

      {/* <button
        className="border-2 border-tertiary text-white px-10 py-3"
        onClick={downloadPDF}
      >
        Share Portfolio
      </button> */}
    </div>
  );
}

export default Intro;
