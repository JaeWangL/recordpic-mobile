import {
  ChangeCurrentAlbumPayload,
  GetAlbumsFailedPayload,
  GetAlbumsSuccessPayload,
  SetClearAlbumPayload,
  SetCurrentAlbumPayload,
} from './payloads';

export enum ActionTypes {
  GET_ALBUMS = 'album/GET_ALBUMS',
  GET_ALBUMS_FAILED = 'album/GET_ALBUMS_FAILED',
  GET_ALBUMS_SUCCESS = 'album/GET_ALBUMS_SUCCESS',
  CHANGE_CURRENT_ALBUM = 'album/CHANGE_CURRENT_ALBUM',
  SET_CURRENT_ALBUM = 'album/SET_CURRENT_ALBUM',
  SET_CLEAR_ALBUM = 'album/SET_CLEAR_ALBUM',
}

export interface GetAlbumsAction {
  type: typeof ActionTypes.GET_ALBUMS;
  payload: undefined;
}

export interface GetAlbumsFailedAction {
  type: typeof ActionTypes.GET_ALBUMS_FAILED;
  payload: GetAlbumsFailedPayload;
}

export interface GetAlbumsSuccessAction {
  type: typeof ActionTypes.GET_ALBUMS_SUCCESS;
  payload: GetAlbumsSuccessPayload;
}

export interface ChangeCurrentAlbumAction {
  type: typeof ActionTypes.CHANGE_CURRENT_ALBUM;
  payload: ChangeCurrentAlbumPayload;
}

export interface SetCurrentAlbumAction {
  type: typeof ActionTypes.SET_CURRENT_ALBUM;
  payload: SetCurrentAlbumPayload;
}

export interface SetClearAlbumAction {
  type: typeof ActionTypes.SET_CLEAR_ALBUM;
  payload: SetClearAlbumPayload;
}

export type AlbumAction =
  | GetAlbumsAction
  | GetAlbumsFailedAction
  | GetAlbumsSuccessAction
  | ChangeCurrentAlbumAction
  | SetCurrentAlbumAction
  | SetClearAlbumAction;

export const getAlbums = (): AlbumAction => ({
  type: ActionTypes.GET_ALBUMS,
  payload: undefined,
});

export const getAlbumsFailed = (payload: GetAlbumsFailedPayload): AlbumAction => ({
  type: ActionTypes.GET_ALBUMS_FAILED,
  payload,
});

export const getAlbumsSuccess = (payload: GetAlbumsSuccessPayload): AlbumAction => ({
  type: ActionTypes.GET_ALBUMS_SUCCESS,
  payload,
});

export const changeCurrentAlbum = (payload: ChangeCurrentAlbumPayload): AlbumAction => ({
  type: ActionTypes.CHANGE_CURRENT_ALBUM,
  payload,
});

export const setCurrentAlbum = (payload: SetCurrentAlbumPayload): AlbumAction => ({
  type: ActionTypes.SET_CURRENT_ALBUM,
  payload,
});

export const setClearAlbum = (payload: SetClearAlbumPayload): AlbumAction => ({
  type: ActionTypes.SET_CLEAR_ALBUM,
  payload,
});
