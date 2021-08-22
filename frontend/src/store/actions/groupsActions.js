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
    updateGroupRequest,
    updateGroupSuccess,
    updateGroupFailure,
    inviteFriendRequest,
    inviteFriendSuccess,
    inviteFriendFailure,
    editRoleFriendRequest,
    editRoleFriendSuccess,
    editRoleFriendFailure,
    deleteGroupRequest,
    deleteGroupSuccess,
    deleteFriendRequest,
    deleteFriendSuccess
} = groupsSlice.actions;