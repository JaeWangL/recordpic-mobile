import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  AuthTokensDto,
  SignInRequest,
  SignInSocialRequest,
  SignInType,
  UpdateProfileRequest,
  UserDto,
  UserPreviewDto,
} from '@/dtos';
import { goBack } from '@/navigation/navigation.service';
import { signInAsync, signInSocialAsync, updateProfileAsync } from '@/services';
import { decodeUser } from '@/utils';
import { setClearAlbum } from '../album/actions';
import { setClearMoment } from '../moment/actions';
import { RootState } from '../rootReducers';
import {
  signInFailed,
  signInSuccess,
  signOutSuccess,
  updateUserFailed,
  updateUserSuccess,
  ActionTypes,
  SignInAction,
  SignOutAction,
  UpdateUserAction,
} from './actions';
import { UserState } from './reducers';

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

function* updateUser({ payload }: UpdateUserAction): SagaIterator {
  const { id, name, imageUrl, accessToken } = payload;
  const currentUser: UserState = yield select((state: RootState) => state.user);
  if (!currentUser.user) {
    yield put(updateUserFailed({ errorMsg: 'Current User is undefined' }));
    return;
  }

  try {
    const request: UpdateProfileRequest = {
      id,
      name,
      imageUrl,
    };

    const res: UserPreviewDto | undefined = yield call(updateProfileAsync, request, accessToken);
    if (res) {
      const updatedUser: UserDto = {
        ...currentUser.user,
        name: res.name,
        imageUrl: res.imageUrl,
      };
      yield put(updateUserSuccess({ user: updatedUser }));

      goBack();
    }
  } catch (error) {
    yield put(updateUserFailed({ errorMsg: error }));
  }
}

function* UserSaga(): Generator {
  yield takeLatest(ActionTypes.SIGN_IN, signIn);
  yield takeLatest(ActionTypes.SIGN_OUT, signOut);
  yield takeLatest(ActionTypes.UPDATE_USER, updateUser);
}

export default UserSaga;
