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

export const reducers = (state: UserState = initialState, action: UserAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: (payload as SignInFailedPayload).errorMsg,
      };
    case ActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: (payload as SignInSuccessPayload).user,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
