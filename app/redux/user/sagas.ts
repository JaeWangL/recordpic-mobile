import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthTokensDto, SignInRequest, SignInSocialRequest, SignInType } from '@/dtos';
import { signInAsync, signInSocialAsync } from '@/services';
import { decodeUser } from '@/utils';
import { setClearAlbum } from '../album/actions';
import { setClearMoment } from '../moment/actions';
import { signInFailed, signInSuccess, signOutSuccess, ActionTypes, SignInAction, SignOutAction } from './actions';

export function* signIn({ payload }: SignInAction): SagaIterator {
  const { email, imageUrl, name, password, socialType, socialId } = payload;

  try {
    if (!password && name && socialType && socialId) {
      const request: SignInSocialRequest = {
        email,
        name,
        imageUrl: imageUrl !== null ? imageUrl : undefined,
        type: SignInType.Mobile,
        socialType,
        socialId,
      };
      const res: AuthTokensDto = yield call(signInSocialAsync, request);
      const user = decodeUser(res.accessToken, res.refreshToken);

      yield put(signInSuccess({ user }));
    }
    if (password && !socialType && !socialId) {
      const request: SignInRequest = {
        email,
        password,
        type: SignInType.Mobile,
      };
      const res: AuthTokensDto = yield call(signInAsync, request);
      const user = decodeUser(res.accessToken, res.refreshToken);

      yield put(signInSuccess({ user }));
    }
  } catch (error) {
    yield put(signInFailed({ errorMsg: error }));
  }
}

function* signOut({ payload }: SignOutAction): SagaIterator {
  const { clearStorage } = payload;
  if (clearStorage) {
    yield put(setClearAlbum());
    yield put(setClearMoment());
  }

  yield put(signOutSuccess());
}

function* UserSaga(): Generator {
  yield takeLatest(ActionTypes.SIGN_IN, signIn);
  yield takeLatest(ActionTypes.SIGN_OUT, signOut);
}

export default UserSaga;
