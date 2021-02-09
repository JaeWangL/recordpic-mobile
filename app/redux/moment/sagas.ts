import { SagaIterator } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import {
  setCurrentMoment,
  setCurrentPhoto,
  ActionTypes,
  SetCurrentMomentAction,
  SetCurrentPhotoAction,
} from './actions';

export function* setCurrentMomentSaga({ payload }: SetCurrentMomentAction): SagaIterator {
  const { index } = payload;

  yield put(setCurrentMoment({ index }));
}

export function* setCurrentPhotoSaga({ payload }: SetCurrentPhotoAction): SagaIterator {
  const { index } = payload;

  yield put(setCurrentPhoto({ index }));
}

function* MomentSaga(): Generator {
  yield takeLatest(ActionTypes.SET_CURRENT_MOMENT, setCurrentMomentSaga);
  yield takeLatest(ActionTypes.SET_CURRENT_PHOTO, setCurrentPhotoSaga);
}

export default MomentSaga;
