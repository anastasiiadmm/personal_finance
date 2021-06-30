import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    cards: {
        marginBottom: 30
    },
    card1: {
        display: 'flex',
        height: 500,
        background: '#6073d6'
    },
    card: {
        backgroundImage: `url(https://cdn.dribbble.com/users/3371648/screenshots/9961035/budgetdribble_4x.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    card3: {
        backgroundImage: `url(https://cdn.dribbble.com/users/3325754/screenshots/11231173/dribble_cover_4x.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    title: {
      color: 'white',
        padding: 10
    },
    cardDetails: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center'
    },
    cardMedia: {
        width: 160,
    },
});

export default function FeaturedPost(props) {
    const classes = useStyles();
    return (
        <Grid container direction='row' className={classes.cards}>
            <Grid item xs={12} md={6}>
                <Grid className={classes.card1}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5" className={classes.title}>
                                Track balances
                            </Typography>
                            <Typography variant="subtitle1" className={classes.title}>
                                Keep track of shared expenses, balances, and who owes who.
                            </Typography>
                        </CardContent>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={classes.card}>
                <Grid>
                    <div className={classes.cardDetails}></div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={classes.card3}>
                <Grid>
                    <div className={classes.cardDetails}></div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid className={classes.card1}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5" className={classes.title}>
                                Pay friends back
                            </Typography>
                            <Typography variant="subtitle1" className={classes.title}>
                                Settle up with a friend and record any cash or online payment.
                            </Typography>
                        </CardContent>
                    </div>
                </Grid>
            </Grid>
        </Grid>

    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};