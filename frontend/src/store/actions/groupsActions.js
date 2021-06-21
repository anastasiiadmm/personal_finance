import groupsSlice from "../slices/groupsSlice";

export const {
    groupsRequest,
    groupsSuccess,
    groupsFailure,
    singleGroupRequest,
    singleGroupSuccess,
    singleGroupFailure,
    createGroupRequest,
    createGroupSuccess,
    createGroupFailure,
    inviteFriendRequest,
    inviteFriendSuccess,
    inviteFriendFailure,
    deleteEventRequest,
    deleteEventSuccess
} = groupsSlice.actions;