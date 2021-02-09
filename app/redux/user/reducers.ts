import produce from 'immer';
import { UserDto } from '@/dtos';
import { ActionTypes, UserAction } from './actions';
import { SignInFailedPayload, SignInSuccessPayload } from './payloads';

export interface UserState {
  isLoading: boolean;
  errorMsg?: string;
  user?: UserDto;
}

export const initialState: UserState = {
  isLoading: false,
};

export const reducers = (state: UserState = initialState, action: UserAction): UserState =>
  produce(
    state,
    (draft): UserState => {
      const { type, payload } = action;

      switch (type) {
        case ActionTypes.SIGN_IN:
          draft.isLoading = true;
          return draft;
        case ActionTypes.SIGN_IN_FAILED:
          draft.isLoading = false;
          draft.errorMsg = (payload as SignInFailedPayload).errorMsg;
          return draft;
        case ActionTypes.SIGN_IN_SUCCESS:
          draft.isLoading = false;
          draft.user = (payload as SignInSuccessPayload).user;
          return draft;
        case ActionTypes.SIGN_OUT_SUCCESS:
          return initialState;
        default:
          return state;
      }
    },
  );
