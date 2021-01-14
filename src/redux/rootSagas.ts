import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import UserSaga from './user/sagas';

function* rootSaga(): Generator<AllEffect<ForkEffect>, void, unknown> {
  yield all([fork(UserSaga)]);
}

export default rootSaga;
