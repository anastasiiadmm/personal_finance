import React from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    makeStyles
} from "@material-ui/core";
import BackspaceIcon from '@material-ui/icons/Backspace';
import {apiURL} from "../../config";

const useStyles = makeStyles(theme => ({
    progress: {
        height: 200
    },
    card: {
        height: '100%',
        width: '70%',
        display: "flex",
        justifyContent: 'space-between'
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
}));

const AccountItem = ({accountName, preferences, balance, deleteAccount, accountIcon}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <Card className={classes.card}>
                <img src="" alt=""/>
                <Avatar  src={apiURL + '/' + accountIcon} />
                <CardHeader title={accountName}/>

                <CardContent className={classes.content}>

                    <p style={{paddingLeft: '100px'}}>
                        {balance}  {preferences}
                    </p>
                </CardContent>
                <CardActions>
                    <IconButton color="primary" onClick={deleteAccount}>
                        <BackspaceIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AccountItem;