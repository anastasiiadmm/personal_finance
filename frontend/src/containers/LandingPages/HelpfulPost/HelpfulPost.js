import React from 'react';
import {Grid, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CategoryIcon from '@material-ui/icons/Category';
import EuroIcon from '@material-ui/icons/Euro';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        textAlign: 'center',
        margin: 30
    },
    text: {
        marginBottom: 20
    },
    paper: {
        textAlign: 'center'
    },
    demo: {
        textAlign: 'center',
        alignItems: 'center'
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    item: {
        backgroundImage: 'url(https://cdn.dribbble.com/users/1344595/screenshots/14475423/media/1e6dd8de861c3e2423d3612db45aa6ae.png?compress=1&resize=1600x1200)',
        backgroundSize: '100%',
        padding: 0
    }
}));

const HelpfulPost = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h3' className={classes.text}>The whole nine yards</Typography>
            <Grid item container spacing={3} direction='row' justify='space-evenly'>
                <Grid item className={classes.demo}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <GroupIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Add groups and friends"
                                secondary='Secondary text'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <MonetizationOnIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Calculate total balances"
                                secondary='Secondary text'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <PaymentIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Payment integrations"
                                secondary='Secondary text'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <AccountBalanceWalletIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Account balance"
                                secondary='Secondary text'
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item className={classes.demo}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <CategoryIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Categorize expenses"
                                secondary='Secondary text'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <EuroIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="3 currencies"
                                secondary='Secondary text'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <ColorLensIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="A totally ad-free experience"
                                secondary='Secondary text'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Icon>
                                    <HowToRegIcon color="primary" className={classes.large}/>
                                </Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Family support"
                                secondary='Secondary text'
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default HelpfulPost;