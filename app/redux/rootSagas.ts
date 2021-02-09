import { all } from 'redux-saga/effects';
import AlbumSaga from './album/sagas';
import MomentSaga from './moment/sagas';
import UserSaga from './user/sagas';

function* rootSaga(): Generator {
  yield all([AlbumSaga(), MomentSaga(), UserSaga()]);
}

export default rootSaga;
