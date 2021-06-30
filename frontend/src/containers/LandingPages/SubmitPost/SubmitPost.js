import React from 'react';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        textAlign: 'center',
        margin: 60
    },
    button: {
        fontSize: 30,
        padding: 15,
        '&:hover': {
            color: '#fff'
        }
    }
}));

const SubmitPost = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item container spacing={3} direction='row' justify='space-evenly' alignItems='center'>
                <Grid item>
                    <Typography variant='h4' style={{padding: 20}}> Get even more with PRO</Typography>
                    <Typography variant='h6' style={{lineHeight: 2, maxWidth: 700}}>Get even more organized with receipt scanning,
                        charts and graphs, currency conversion, and more!
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" component={Link} to="/signup" className={classes.button}>Sign up</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SubmitPost;