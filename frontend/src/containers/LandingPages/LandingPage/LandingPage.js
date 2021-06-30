import React from 'react';
import Slider from "../Slider.js/Slider";
import FeaturedPost from "../FeaturedPost/FeaturedPost";
import HelpfulPost from "../HelpfulPost/HelpfulPost";
import SubmitPost from "../SubmitPost/SubmitPost";

const LandingPage = () => {
  return (
    <>
      <Slider/>
      <FeaturedPost/>
      <HelpfulPost/>
      <SubmitPost/>
    </>
  );
};

export default LandingPage;