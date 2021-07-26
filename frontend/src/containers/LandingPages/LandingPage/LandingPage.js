import React from 'react';
import Slider from "../Slider/Slider";
import FeaturedPost from "../FeaturedPost/FeaturedPost";
import HelpfulPost from "../HelpfulPost/HelpfulPost";
import SubmitPost from "../SubmitPost/SubmitPost";
import Footer from "../Footer/Footer";

const LandingPage = () => {
    return (
        <>
            <Slider/>
            <FeaturedPost/>
            <HelpfulPost/>
            <SubmitPost/>
            <Footer/>
        </>
    );
};

export default LandingPage;