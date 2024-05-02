import React, { useEffect, useRef } from "react";
import Header from "../../Components/Header";
import Intro from "./intro";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Courses from "./Courses";
import Contact from "./Contact";
import Footer from "./Footer";
import Sider from "./Sider";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { ReloadData, SetportfolioData } from "../../redux/rootSlice";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const getportfolioData = async () => {
    try {
      const response = await axios.get("/api/portfolio/share/" + id);

      dispatch(SetportfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("/share")) {
      getportfolioData();
    }
  }, []);
  return (
    <div ref={pdfRef}>
      {portfolioData && (
        <>
          <Header />
          <div className="bg-primary px-40 sm:px-5">
            <Intro pdfRef={pdfRef} />
            <About />
            <Experiences />
            <Projects />
            <Courses />
            <Contact />
            <Footer />
            <Sider />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
