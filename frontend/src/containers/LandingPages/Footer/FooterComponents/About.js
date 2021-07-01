import React from 'react';
import {Box, CardActionArea, CardMedia, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {teams} from "../../../../utils";
import Card from "../../../../template/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";

import background from "../../../../assets/images/personalLogo.png"

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        margin: 20
    },
    img: {
        objectFit: 'contain'
    }
});

const About = () => {
    const classes = useStyles();

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item xs>
                <Typography variant='h3' style={{marginTop: 60, marginLeft: 145}}>What is Financier?</Typography>
            </Grid>
            <Grid container direction='row' justify='space-between' style={{marginBottom: 30}}>
                <Box width="40%" style={{marginLeft: 80}}>
                    <Typography style={{fontSize: 18, textAlign: 'center'}}>Financier is a Providence, RI-based company
                        that
                        makes it easy to split bills with
                        friends and family. We organize all your shared expenses and IOUs in one place,
                        so that everyone can see who they owe. Whether you are sharing a ski vacation,
                        splitting rent with roommates, or paying someone back for lunch,
                        Financier makes life easier. We store your data in the cloud so that you can access it anywhere:
                        on iPhone, Android, or on your computer.
                    </Typography>
                </Box>
                <Box width="40%">
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={background}
                            title="Contemplative Reptile"
                            className={classes.img}
                        />
                    </Card>
                </Box>
            </Grid>
            <Grid item container spacing={2} direction='column' style={{marginBottom: 30}}>
                <Typography variant='h3' style={{marginLeft: 145}}>Meet the team</Typography>
                <Grid item container spacing={1} justify='center'>
                    {teams.map(t => (
                        <Card className={classes.root} key={t.id}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={t.name}
                                    height="140"
                                    image={t.url}
                                    title={t.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {t.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {t.position}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default About;