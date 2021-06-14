import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Groups from "../../../../containers/Groups/Groups";

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionDetails: {
        flexDirection: 'column',
        paddingLeft: 4
    }
}));

const AccordionMenu = () => {
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary>
                <Grid item container justify='space-evenly' alignItems='center'>
                    <Grid item xs>
                        <Typography className={classes.heading}>My Groups</Typography>
                    </Grid>
                    <Grid item xs>
                        <Button color="primary" component={Link} to="/groups/new">add</Button>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Groups />
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionMenu;