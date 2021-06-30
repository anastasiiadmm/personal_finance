import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IndicatorWrapper from "../IndicatorWrapper/IndicatorWrapper";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: '100vh',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'hidden',
        position: 'relative'
    },
    slide: {
        height: '100%',
        width: '100vw',
        flexShrink: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: '750ms all ease-in-out'
    },
    gradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    childrenWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(19),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(19),
            paddingRight: 0,
        },
    },
    button: {
        marginTop: '20px',
        fontSize: 30,
        '&:hover': {
            color: '#fff'
        }
    }
}));

const ImageSlider = ({images = [], autoPlay = true, autoPlayTime = 3000, children, ...props}) => {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = (slideIndex = currentSlide + 1) => {
        const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

        setCurrentSlide(newSlideIndex);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, autoPlayTime);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    // <Grid container className={classInfo}>
    //     <Grid item md={7}>
    //         <div className={classes.mainFeaturedPostContent}>
    //             <Typography variant="h4" className={classes.paragraph} paragraph>
    //                 Welcome to <b className={classes.logoText}>FINANCIER</b>
    //             </Typography>
    //             <Typography component="h1" variant="h3" className={classes.paragraph} gutterBottom>
    //                 Your personal budget planning assistant
    //             </Typography>
    //             <Button variant="contained" color="primary" component={Link} to="/signup" className={classes.button}>Sign up</Button>
    //         </div>
    //     </Grid>
    // </Grid>

    return (
        <div className={classes.wrapper} {...props}>
            {images.map((imageUrl, index) => (
                <div className={classes.slide} key={index}
                     style={{backgroundImage: `url(${imageUrl})`, marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined}}
                >
                </div>
            ))}
            <div className={classes.gradient}></div>
            <IndicatorWrapper
                currentSlide={currentSlide}
                amountSlides={images.length}
                nextSlide={nextSlide}
            />
            <div className={classes.childrenWrapper}>{children}</div>
        </div>
    )
};
export default ImageSlider;