import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles({
    root: {

    }
});

const Transaction = () => {
    const classes = useStyle();

    return (
        <Grid item container direction="column" className={classes.root}>
            <Grid item container direction='row' spacing={2}>
                <Grid item xs>

                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
            <Grid item xs>
                <Doughnut
                    type='doughnut'
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
            </Grid>
        </Grid>
    );
};

export default Transaction;