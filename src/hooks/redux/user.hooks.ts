import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducers';
import { signIn, signOut, UserState, SignInPayload, SignOutPayload, UserAction } from '@/redux/user';

export interface UserStore {
  user: UserState;
  signIn: (payload: SignInPayload) => UserAction;
  signOut: (payload: SignOutPayload) => UserAction;
}

export const useUserStore = (): UserStore => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const signInDispatch = useCallback((payload: SignInPayload) => dispatch(signIn(payload)), [dispatch]);
  const signOutDispatch = useCallback((payload: SignOutPayload) => dispatch(signOut(payload)), [dispatch]);

  return {
    user,
    signIn: signInDispatch,
    signOut: signOutDispatch,
  };
};
