import { combineReducers } from 'redux';
import * as User from './user';

export interface RootState {
  user: User.UserState;
}

const rootReducer = combineReducers({
  user: User.reducers,
});

export default rootReducer;
