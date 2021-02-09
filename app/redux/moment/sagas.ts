import { SagaIterator } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import {
  setCurrentMoment,
  setCurrentPhoto,
  ActionTypes,
  ChangeCurrentMomentAction,
  ChangeCurrentPhotoAction,
} from './actions';

export function* changeCurrentMomentSaga({ payload }: ChangeCurrentMomentAction): SagaIterator {
  const { index } = payload;

  yield put(setCurrentMoment({ index }));
}

export function* changeCurrentPhotoSaga({ payload }: ChangeCurrentPhotoAction): SagaIterator {
  const { index } = payload;

  yield put(setCurrentPhoto({ index }));
}

function* MomentSaga(): Generator {
  yield takeLatest(ActionTypes.CHANGE_CURRENT_MOMENT, changeCurrentMomentSaga);
  yield takeLatest(ActionTypes.CHANGE_CURRENT_PHOTO, changeCurrentPhotoSaga);
}

export default MomentSaga;
