import React from 'react';
import ImageSlider from "./ImageSlider/ImageSlider";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

import image1 from "../../../assets/images/slide5.webp";
import image2 from "../../../assets/images/slide1.webp";
import image3 from "../../../assets/images/slide3.webp";

const useStyles = makeStyles((theme) => ({
    logoText: {
        color: '#3f50b5',
        fontSize: 50
    },
    paragraph: {
        textAlign: 'center'
    },
    button: {
        marginTop: '20px',
        fontSize: 30,
        '&:hover': {
            color: '#fff'
        }
    }
}));

const Slider = () => {
    const classes = useStyles();

    return (
        <ImageSlider images={[image1, image2, image3]}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", color: "#fff",}}>
                <Typography variant='h4'>Welcome to <b className={classes.logoText}>FINANCIER</b></Typography>
                <Typography component="h1" variant="h3" className={classes.paragraph} gutterBottom>
                    Your personal budget planning assistant</Typography>
                <Button variant="contained" color="primary" component={Link} to="/signup" className={classes.button}>Sign up</Button>

            </div>
        </ImageSlider>
    );
}

export default Slider;