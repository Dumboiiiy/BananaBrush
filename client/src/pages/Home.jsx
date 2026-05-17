import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import { stepsData } from "../assets/assets";
import Description from "../components/Description";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      {/* <Testimonials /> */}
    </div>
  );
};

export default Home;
