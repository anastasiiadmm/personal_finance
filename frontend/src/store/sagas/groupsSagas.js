import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    createGroupFailure,
    createGroupRequest,
    createGroupSuccess,
    deleteFriendRequest,
    deleteFriendSuccess, deleteGroupRequest,
    deleteGroupSuccess, editRoleFriendRequest, editRoleFriendSuccess,
    groupsFailure,
    groupsRequest,
    groupsSuccess,
    inviteFriendFailure,
    inviteFriendRequest,
    inviteFriendSuccess,
    singleGroupFailure,
    singleGroupRequest,
    singleGroupSuccess,
    updateGroupRequest,
    updateGroupSuccess
} from "../actions/groupsActions";
import {addNotification} from "../actions/notifierActions";
import {historyPush} from "../actions/historyActions";
import {transactionEditFailure} from "../actions/transactionsActions";

export function* fetchGroups() {
    try {
        const response = yield axiosApi.get('/groups');
        yield put(groupsSuccess(response.data));
    } catch (e) {
        yield put(groupsFailure());
        yield put(addNotification({message: 'Could not fetch groups', options: {variant: 'error'}}));
    }
}

export function* fetchSingleGroup({payload: groupId}) {
    try {
        const response = yield axiosApi.get('/groups/' + groupId);
        yield put(singleGroupSuccess(response.data));
    } catch (e) {
        yield put(singleGroupFailure());
        yield put(addNotification({message: 'Fetch single group failed', options: {variant: 'error'}}));
    }
}

export function* createGroup({payload: data}) {
    try {
        yield axiosApi.post('/groups', data);
        yield put(createGroupSuccess());
        yield put(groupsRequest());
        yield put(addNotification({message: 'Group created successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(createGroupFailure(e.response.data));
        yield put(addNotification({message: 'Create group failed', options: {variant: 'error'}}));
    }
}

export function* updateGroup({payload: groupData}) {
    try {
        const data = new FormData();
        Object.keys(groupData).forEach(key => {
            data.append(key, groupData[key]);
        });

        const response = yield axiosApi.put(`/groups/${groupData.groupId}`, data);
        yield put(updateGroupSuccess(response.data));
        yield put(historyPush(`/groups/${groupData.groupId}`));
        yield put(singleGroupRequest(groupData.groupId));
        yield put(addNotification({message: 'Group update successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(addNotification({message: 'Group update failed', options: {variant: 'error'}}));
    }
}

export function* inviteFriend({payload: inviteData}) {
    try {
        yield axiosApi.post('/groups/' + inviteData.groupId, {email: inviteData.email});
        yield put(inviteFriendSuccess());
        yield put(singleGroupRequest(inviteData.groupId));
        yield put(addNotification({message: 'Invite successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(inviteFriendFailure(e.response.data));
        yield put(addNotification({message: 'Invite failed!', options: {variant: 'error'}}));
    }
}

export function* editRoleFriend({payload: data}) {
    try {
        yield axiosApi.put('/groups/' + data.groupId, {editUserId: data.state.id, role: data.state.role});
        yield put(editRoleFriendSuccess());
        yield put(singleGroupRequest(data.groupId));
        yield put(addNotification({message: 'Update role successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(transactionEditFailure(e.response.data.message));
        yield put(addNotification({message: e.response.data.message, options: {variant: 'error'}}));
    }
}

export function* deleteFriend({payload: data}) {
    try {
        yield axiosApi.delete(`/groups/${data.groupId}/${data.editUserId}/deleted`);
        yield put(deleteFriendSuccess());
        yield put(historyPush(`/groups/${data.groupId}`));
        yield put(singleGroupRequest(data.groupId));
        yield put(addNotification({message: 'Delete user successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(addNotification({message: 'Delete friend failed', options: {variant: 'error'}}));
    }
}

export function* deleteGroup({payload: id}) {
    try {
        yield axiosApi.delete(`/groups/${id}/delete`);
        yield put(deleteGroupSuccess(id));
        yield put(historyPush('/groups'));
        yield put(addNotification({message: 'Group deleted successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(addNotification({message: 'Delete failed', options: {variant: 'error'}}));
    }
}

const groupsSagas = [
    takeEvery(groupsRequest, fetchGroups),
    takeEvery(singleGroupRequest, fetchSingleGroup),
    takeEvery(createGroupRequest, createGroup),
    takeEvery(inviteFriendRequest, inviteFriend),
    takeEvery(editRoleFriendRequest, editRoleFriend),
    takeEvery(deleteGroupRequest, deleteGroup),
    takeEvery(updateGroupRequest, updateGroup),
    takeEvery(deleteFriendRequest, deleteFriend)
];

export default groupsSagas;