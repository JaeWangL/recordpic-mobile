import {
  SignInPayload,
  SignInFailedPayload,
  SignInSuccessPayload,
  SignOutPayload,
  UpdateUserPayload,
  UpdateUserFailedPayload,
  UpdateUserSuccessPayload,
} from './payloads';

export enum ActionTypes {
  SIGN_IN = 'user/SIGN_IN',
  SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_OUT = 'user/SIGN_OUT',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
  UPDATE_USER = 'user/UPDATE_USER',
  UPDATE_USER_FAILED = 'user/UPDATE_USER_FAILED',
  UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS',
}

export interface SignInAction {
  type: typeof ActionTypes.SIGN_IN;
  payload: SignInPayload;
}

export interface SignInFailedAction {
  type: typeof ActionTypes.SIGN_IN_FAILED;
  payload: SignInFailedPayload;
}

export interface SignInSuccessAction {
  type: typeof ActionTypes.SIGN_IN_SUCCESS;
  payload: SignInSuccessPayload;
}

export interface SignOutAction {
  type: typeof ActionTypes.SIGN_OUT;
  payload: SignOutPayload;
}

export interface SignOutSuccessAction {
  type: typeof ActionTypes.SIGN_OUT_SUCCESS;
  payload?: undefined;
}

export interface UpdateUserAction {
  type: typeof ActionTypes.UPDATE_USER;
  payload: UpdateUserPayload;
}

export interface UpdateUserFailedAction {
  type: typeof ActionTypes.UPDATE_USER_FAILED;
  payload: UpdateUserFailedPayload;
}

export interface UpdateUserSuccessAction {
  type: typeof ActionTypes.UPDATE_USER_SUCCESS;
  payload: UpdateUserSuccessPayload;
}

export type UserAction =
  | SignInAction
  | SignInFailedAction
  | SignInSuccessAction
  | SignOutAction
  | SignOutSuccessAction
  | UpdateUserAction
  | UpdateUserFailedAction
  | UpdateUserSuccessAction;

export const signIn = (payload: SignInPayload): UserAction => ({
  type: ActionTypes.SIGN_IN,
  payload,
});

export const signInFailed = (payload: SignInFailedPayload): UserAction => ({
  type: ActionTypes.SIGN_IN_FAILED,
  payload,
});

export const signInSuccess = (payload: SignInSuccessPayload): UserAction => ({
  type: ActionTypes.SIGN_IN_SUCCESS,
  payload,
});

export const signOut = (payload: SignOutPayload): UserAction => ({
  type: ActionTypes.SIGN_OUT,
  payload,
});

export const signOutSuccess = (): UserAction => ({
  type: ActionTypes.SIGN_OUT_SUCCESS,
  payload: undefined,
});

export const updateUser = (payload: UpdateUserPayload): UserAction => ({
  type: ActionTypes.UPDATE_USER,
  payload,
});

export const updateUserFailed = (payload: UpdateUserFailedPayload): UserAction => ({
  type: ActionTypes.UPDATE_USER_FAILED,
  payload,
});

export const updateUserSuccess = (payload: UpdateUserSuccessPayload): UserAction => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload,
});
