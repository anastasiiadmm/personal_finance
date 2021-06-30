import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
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

const EditUsersGroupForm = ({onClose}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const groupId = params.id;
    const group = useSelector(state => state.groups.singleGroup);

    const [state, setState] = useState({
        id: '',
        role: ''
    });
    console.log(state)

    const inputChangeHandler = (e, id) => {
        setState(prevState => ({
            ...prevState,
            role: e,
            id: id
        }))
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(editRoleFriendRequest({groupId, state}));
    }

    const deleteUser = async editUserId => {
        await dispatch(deleteFriendRequest({groupId, editUserId}))
    }

    return (
        <Grid container component="form" onSubmit={submitFormHandler}
              noValidate>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="h4">Edit users</Typography>
                </Grid>

                {group.users && (
                    <>
                        {group.users.map((user) => (
                            <Grid item container spacing={2} key={user.id}>
                                <Grid item xs>
                                    <Typography className={classes.displayName}><b>{user.displayName}</b></Typography>
                                    <Typography className={classes.displayName}><b>Email:</b> {user.email}</Typography>
                                </Grid>
                                {user.GroupUsers.role !== 'owner' && (
                                    <>
                                        <FormElement
                                            required
                                            label="Role"
                                            value={user.GroupUsers.role}
                                            select
                                            options={roles}
                                            onChange={(e) => inputChangeHandler(e.target.value, user.id)}
                                            name="roles"
                                        />
                                        <Grid item={2}>
                                            <Grid item xs>
                                                <IconButton onClick={() => deleteUser(user.id)}>
                                                    <HighlightOffIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        ))}
                    </>
                )}

                <Grid item xs className={classes.button}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        color="primary"
                        onClick={onClose}
                    >
                        Update users
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditUsersGroupForm;