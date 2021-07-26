import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  indicatorWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 5,
    transition: '750ms all ease-in-out'
  }
}));

const IndicatorWrapper = ({amountSlides, nextSlide}) => {
  const classes = useStyles();

  return (
    <div className={classes.indicatorWrapper}>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <div className={classes.dot}
               key={i}
               onClick={() => nextSlide(i)}
          />
        ))}
    </div>
  );
};

export default IndicatorWrapper;