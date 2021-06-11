import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import GroupForm from "./GroupForm/GroupForm";

import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {createGroupRequest} from "../../../store/actions/groupsActions";

const NewGroup = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.groups.createGroupError);
    const loading = useSelector(state => state.groups.createGroupLoading);

    const onGroupFormSubmit = async groupData => {
        console.log(groupData)
        dispatch(createGroupRequest(groupData));
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs>
                <Typography variant="h4">Add new group</Typography>
            </Grid>
            <Grid item xs>
                <GroupForm
                    onSubmit={onGroupFormSubmit}
                    loading={loading}
                    error={error}
                />
            </Grid>
        </Grid>
    );
};

export default NewGroup;