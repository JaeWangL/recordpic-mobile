import { combineReducers } from 'redux';
import * as Album from './album';
import * as Moment from './moment';
import * as User from './user';

export interface RootState {
  album: Album.AlbumState;
  moment: Moment.MomentState;
  user: User.UserState;
}

const rootReducer = combineReducers({
  album: Album.reducers,
  moment: Moment.reducers,
  user: User.reducers,
});

export default rootReducer;
