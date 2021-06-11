import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    createGroupFailure, createGroupRequest,
    createGroupSuccess,
    groupsFailure,
    groupsRequest,
    groupsSuccess, inviteFriendFailure, inviteFriendRequest, inviteFriendSuccess, singleGroupFailure,
    singleGroupRequest,
    singleGroupSuccess
} from "../actions/groupsActions";
import {addNotification} from "../actions/notifierActions";
import {historyPush} from "../actions/historyActions";

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
        yield put(historyPush('/'));
        yield put(addNotification({message: 'Group created successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(createGroupFailure(e.response.data));
        yield put(addNotification({message: 'Create group failed', options: {variant: 'error'}}));
    }
}

export function* inviteFriend({payload: inviteData}) {
    try {
        yield axiosApi.post('/groups/add', inviteData);
        yield put(inviteFriendSuccess());
        yield put(addNotification({message: 'Invite successful', options: {variant: 'success'}}));
    } catch (e) {
        yield put(inviteFriendFailure(e.response.data));
        yield put(addNotification({message: 'Invite failed', options: {variant: 'error'}}));
    }
}

const groupsSagas = [
    takeEvery(groupsRequest, fetchGroups),
    takeEvery(singleGroupRequest, fetchSingleGroup),
    takeEvery(createGroupRequest, createGroup),
    takeEvery(inviteFriendRequest, inviteFriend)
];

export default groupsSagas;