import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IndicatorWrapper from "../IndicatorWrapper/IndicatorWrapper";

const useStyles = makeStyles(() => ({
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
  }, [currentSlide, autoPlayTime]);

  return (
    <div className={classes.wrapper} {...props}>
      {images.map((imageUrl, index) => (
        <div className={classes.slide} key={index}
             style={{
               backgroundImage: `url(${imageUrl})`,
               marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined
             }}
        >
        </div>
      ))}
      <div className={classes.gradient}/>
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