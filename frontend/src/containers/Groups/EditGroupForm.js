import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@material-ui/core";
import FormElement from "../../components/UI/Form/FormElement";
import FileInput from "../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {deleteFriendRequest, updateGroupRequest} from "../../store/actions/groupsActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    button: {
        alignSelf: 'flex-end'
    },
    displayName: {
        fontSize: 15
    }
}));

const EditGroupForm = ({onClose}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const groupId = params.id;
    const group = useSelector(state => state.groups.singleGroup);

    const [state, setState] = useState({
        nameGroup: group.nameGroup,
        avatarGroup: group.avatarGroup
    });

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        let groupData = {};

        if (state.nameGroup !== group.nameGroup) {
            groupData.nameGroup = state.nameGroup
        }
        if (state.avatarGroup !== group.avatarGroup) {
            groupData.avatarGroup = state.avatarGroup
        }
        groupData.groupId = groupId;

        if (Object.keys(groupData).length !== 0 && groupData.constructor === Object) {
            await dispatch(updateGroupRequest(groupData));
        }
    };

    const deleteUser = async editUserId => {
        await dispatch(deleteFriendRequest({groupId, editUserId}))
    }

    return (
        <Grid container component="form" onSubmit={submitFormHandler}
              noValidate>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="h4">Edit group</Typography>
                </Grid>

                <FormElement
                    required
                    label="Group name"
                    type="text"
                    onChange={inputChangeHandler}
                    name="nameGroup"
                    value={state.nameGroup}
                />
                <Grid item xs>
                    <FileInput
                        name="avatarGroup"
                        label="Avatar"
                        onChange={fileChangeHandler}
                    />
                </Grid>

                <Grid item xs>
                    <Typography variant="h5">Users</Typography>
                </Grid>

                {group.users && group.users.map(user => (
                    <Grid item container spacing={2} key={user.id}>
                        <Grid item xs>
                            <Typography className={classes.displayName}><b>{user.displayName}</b></Typography>
                            <Typography className={classes.displayName}><b>Email:</b> {user.email}</Typography>
                        </Grid>
                        {user.GroupUsers.role !== 'owner' && (
                            <Grid item xs>
                                <IconButton onClick={() => deleteUser(user.id)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                ))}

                <Grid item xs className={classes.button}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        color="primary"
                        onClick={onClose}
                    >
                        Update group
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditGroupForm;