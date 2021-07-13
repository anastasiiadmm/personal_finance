import React, {useState} from 'react';
import {
    Avatar, Backdrop,
    Card,
    CardActions,
    CardContent,
    CardHeader, Fade,
    Grid,
    IconButton,
    makeStyles, Modal
} from "@material-ui/core";
import {apiURL} from "../../config";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import EditAccount from "./EditAccount/EditAccount";
import {useSelector} from "react-redux";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
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
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: "30px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    palette: {
        color: 'purple',
    },
    paper: {
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[4],
        padding: theme.spacing(2, 4, 3),
    },


}));

const AccountItem = ({accountName, preferences, balance, id, accountIcon}) => {
    const classes = useStyles();
    const [editOpen, setEditOpen] = useState(false);
    const [openListToDelete, setOpenListToDelete] = useState(false);
    const accounts = useSelector(state => state.accounts.accounts);
    const editLoading = useSelector(state => state.accounts.updateAccountLoading);
    const editError = useSelector(state => state.accounts.updateAccountError);
    const deleteError = useSelector(state => state.accounts.deleteAccountError);
    const deleteLoading = useSelector(state => state.accounts.deleteAccountLoading);




    return (
        <>
            <Grid item>
                <Card className={classes.card}>
                    <div className={classes.avatar}>
                        <Avatar alt={accountName} src={apiURL + '/' + accountIcon}/>
                    </div>
                    <CardHeader title={accountName}/>

                    <CardContent className={classes.content}>

                        <p style={{paddingLeft: '100px'}}>
                            {balance} {preferences} id: {id}
                        </p>
                    </CardContent>
                    <CardActions>
                        <IconButton className={classes.palette} onClick={() => setEditOpen(true)}>
                            <Edit/>
                        </IconButton>
                        <IconButton className={classes.palette} onClick={() => setOpenListToDelete(true)}>
                            <Delete/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={editOpen}
                onClose={() => setEditOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editOpen}>
                    <div className={classes.paper}>
                        <EditAccount
                            loading={editLoading}
                            error={editError}
                            id={id}
                            onClose={() => setEditOpen(false)}
                        />
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openListToDelete}
                onClose={() => setOpenListToDelete(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openListToDelete}>
                    <div className={classes.paper}>
                        <DeleteAccount
                            error={deleteError}
                            loading={deleteLoading}
                            id={id}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default AccountItem;