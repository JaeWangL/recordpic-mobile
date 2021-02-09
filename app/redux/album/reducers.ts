import produce from 'immer';
import { MemberWithAlbumDto } from '@/dtos';
import { ActionTypes, AlbumAction } from './actions';
import { GetAlbumsFailedPayload, GetAlbumsSuccessPayload, SetCurrentAlbumPayload } from './payloads';

export interface AlbumState {
  isLoading: boolean;
  errorMsg?: string;
  members?: MemberWithAlbumDto[];
  currentIndex?: number;
}

export const initialState: AlbumState = {
  isLoading: false,
};

export const reducers = (state: AlbumState = initialState, action: AlbumAction): AlbumState =>
  produce(
    state,
    (draft): AlbumState => {
      const { type, payload } = action;

      switch (type) {
        case ActionTypes.GET_ALBUMS:
          draft.isLoading = true;
          return draft;
        case ActionTypes.GET_ALBUMS_FAILED:
          draft.isLoading = false;
          draft.errorMsg = (payload as GetAlbumsFailedPayload).errorMsg;
          return draft;
        case ActionTypes.GET_ALBUMS_SUCCESS:
          draft.isLoading = false;
          draft.members = (payload as GetAlbumsSuccessPayload).members;
          draft.currentIndex = (payload as GetAlbumsSuccessPayload).members.length - 1;
          return draft;
        case ActionTypes.SET_CURRENT_ALBUM:
          draft.currentIndex = (payload as SetCurrentAlbumPayload).index;
          return draft;
        case ActionTypes.SET_CLEAR_ALBUM:
          return initialState;
        default:
          return state;
      }
    },
  );
