import React from 'react';
import ImageSlider from "./ImageSlider/ImageSlider";

import image1 from "../../../assets/images/slide1.webp";
import image2 from "../../../assets/images/slide2.png";
import image3 from "../../../assets/images/slide3.webp";

const Slider = () => {
    return (
        <ImageSlider images={[image1, image2, image3]}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", color: "#fff",}}>
                <h1>React.js Image Slider</h1>
                <p>Nulla vitae elit libero, a pharetra augue.</p>
            </div>
        </ImageSlider>
    );
}

export default Slider;