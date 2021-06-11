import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    groups: [],
    groupsLoading: false,
    singleGroup: {},
    inviteFriendLoading: false,
    inviteFriendError: null,
    singleGroupLoading: false,
    createGroupLoading: false,
    createGroupError: null
};

const name = 'groups';

const groupsSlice = createSlice({
    name,
    initialState,
    reducers: {
        groupsRequest: state => {
            state.groupsLoading = true;
        },
        groupsSuccess: (state, {payload: groups}) => {
            state.groupsLoading = false;
            state.groups = groups;
        },
        groupsFailure: state => {
            state.groupsLoading = false;
        },
        singleGroupRequest: state => {
            state.singleGroupLoading = true;
        },
        singleGroupSuccess: (state, {payload: group}) => {
            state.singleGroupLoading = false;
            state.singleGroup = group;
        },
        singleGroupFailure: state => {
            state.singleGroupLoading = false;
        },
        createGroupRequest: state => {
            state.createGroupLoading = true;
        },
        createGroupSuccess: state => {
            state.createGroupLoading = false;
        },
        createGroupFailure: (state, {payload: error}) => {
            state.createGroupLoading = false;
            state.createGroupError = error;
        },
        inviteFriendRequest: state => {
            state.inviteFriendLoading = true;
        },
        inviteFriendSuccess: state => {
            state.inviteFriendLoading = false;
        },
        inviteFriendFailure: (state, {payload: error}) => {
            state.inviteFriendLoading = false;
            state.inviteFriendError = error;
        }
    }
});

export default groupsSlice;