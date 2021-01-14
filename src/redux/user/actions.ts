import { SignInPayload, SignInFailedPayload, SignInSuccessPayload, SignOutPayload } from './payloads';

export enum ActionTypes {
  SIGN_IN = 'user/SIGN_IN',
  SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_OUT = 'user/SIGN_OUT',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
}

export interface SignInAction {
  type: typeof ActionTypes.SIGN_IN;
  payload: SignInPayload;
}

export interface SignInSuccessFailed {
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

export type UserAction =
  | SignInAction
  | SignInSuccessFailed
  | SignInSuccessAction
  | SignOutAction
  | SignOutSuccessAction;

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
