import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducers';
import { changeCurrentAlbum, getAlbums, AlbumAction, AlbumState, ChangeCurrentAlbumPayload } from '@/redux/album';

export interface AlbumStore {
  album: AlbumState;
  getAlbums: () => AlbumAction;
  changeCurrentAlbum: (payload: ChangeCurrentAlbumPayload) => AlbumAction;
}

export const useAlbumStore = (): AlbumStore => {
  const dispatch = useDispatch();
  const album = useSelector((state: RootState) => state.album);

  const getAlbumsDispatch = useCallback(() => dispatch(getAlbums()), [dispatch]);
  const changeCurrentAlbumDispatch = useCallback(
    (payload: ChangeCurrentAlbumPayload) => dispatch(changeCurrentAlbum(payload)),
    [dispatch],
  );

  return {
    album,
    getAlbums: getAlbumsDispatch,
    changeCurrentAlbum: changeCurrentAlbumDispatch,
  };
};
