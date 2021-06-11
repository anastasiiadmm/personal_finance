import groupsSlice from "../slices/groupsSlice";

export const {
    groupsRequest,
    groupsSuccess,
    groupsFailure,
    singleGroupRequest,
    singleGroupSuccess,
    singleGroupFailure,
    inviteFriendRequest,
    inviteFriendSuccess,
    inviteFriendFailure
} = groupsSlice.actions;