import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@material-ui/core";
import FormElement from "../../../../components/UI/Form/FormElement";
import FileInput from "../../../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {updateGroupRequest} from "../../../../store/actions/groupsActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";

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
        title: group.title,
        avatar: group.avatar,
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

        if (state.title !== group.title) {
            groupData.title = state.title
        }
        if (state.avatar !== group.avatar) {
            groupData.avatar = state.avatar
        }
        groupData.groupId = groupId;

        if (Object.keys(groupData).length !== 0 && groupData.constructor === Object) {
            await dispatch(updateGroupRequest(groupData));
        }
    };

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
                    value={state.title}
                />
                <Grid item xs>
                    <FileInput
                        name="avatarGroup"
                        label="Avatar"
                        onChange={fileChangeHandler}
                    />
                </Grid>

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