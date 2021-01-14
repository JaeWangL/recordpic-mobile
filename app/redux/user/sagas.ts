import JwtDecode from 'jwt-decode';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { AuthTokensDto, DecodedUser, UserDto } from '@/dtos';
import { signInFailed, signInSuccess, signOutSuccess, ActionTypes, SignInAction, SignOutAction } from './actions';

export function* signIn({ payload }: SignInAction): SagaIterator {
  const { email, password } = payload;
  try {
    /* eslint-disable */
    const response: AuthTokensDto = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6InN0cmluZyIsImlhdCI6MTYwOTkxOTkyMiwiZXhwIjoxNjEwMDA2MzIyfQ.rKYyJbjqCgaF5tEWa8W1OA8G6X6KRyMQhoMugzKOKV4',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6InN0cmluZyIsImlhdCI6MTYwOTkxOTkyMiwiZXhwIjoxNjEwNTI0NzIyfQ.P2F9JsgeYTCyrSto6RUzsvcC_x6rZccppuFKSVxw6Cg',
    };
    /* eslint-enable */
    const decoded: DecodedUser = JwtDecode(response.accessToken);
    const user: UserDto = {
      id: decoded.id,
      email: decoded.email,
      iat: decoded.iat,
      exp: decoded.exp,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    yield put(signInSuccess({ user }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signOut({ payload }: SignOutAction): SagaIterator {
  yield put(signOutSuccess());
}

function* UserSaga(): Generator {
  yield takeEvery(ActionTypes.SIGN_IN, signIn);
  yield takeEvery(ActionTypes.SIGN_OUT, signOut);
}

export default UserSaga;
