import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {deleteFriendRequest, editRoleFriendRequest} from "../../../../store/actions/groupsActions";
import {Grid, Typography} from "@material-ui/core";
import FormElement from "../../../../components/UI/Form/FormElement";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ButtonWithProgress from "../../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {roles} from "../../../../utils";

const useStyles = makeStyles(theme => ({
    button: {
        alignSelf: 'flex-end'
    },
    displayName: {
        fontSize: 15
    }
}));

const EditUsersGroupForm = ({onClose, modalUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const groupId = params.id;

    const [state, setState] = useState({
        role: modalUser.GroupUsers.role,
        id: modalUser.id
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(editRoleFriendRequest({groupId, state}));
    }

    const deleteUser = async editUserId => {
        await dispatch(deleteFriendRequest({groupId, editUserId}));
    }

    return (
        <Grid container component="form" onSubmit={submitFormHandler}
              noValidate>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="h4">Edit user group</Typography>
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item xs>
                        <Typography className={classes.displayName}><b>{modalUser.displayName}</b></Typography>
                        <Typography className={classes.displayName}><b>Email:</b> {modalUser.email}</Typography>
                    </Grid>
                    <FormElement
                        required
                        label="Role"
                        value={state.role}
                        select
                        options={roles}
                        onChange={inputChangeHandler}
                        name="role"
                    />
                    <Grid item={2}>
                        <Grid item xs>
                            <IconButton onClick={() => deleteUser(modalUser.id)}>
                                <HighlightOffIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs className={classes.button}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        color="primary"
                        onClick={onClose}
                    >
                        Update user
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditUsersGroupForm;