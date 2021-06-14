import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    padding: '100px 0'
  }
});

const Transaction = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Doughnut
        width={400}
        height={400}
        data={{
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
        }}
      />
    </div>
  );
};

export default Transaction;