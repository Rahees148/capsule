import { takeLatest } from 'redux-saga';
import { call,put } from 'redux-saga/effects'
import { getUserName } from './services';

function* getUserName_(action) {
    const username = yield call(getUserName, action.username);
    yield put({ type: 'SET_USERNAME', username });
}

export default function* sagas() {
    yield takeLatest('GET_USERNAME', getUserName_);
}