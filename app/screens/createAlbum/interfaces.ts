import { getBGThumbnail } from '@/utils';

export interface AlbumTemplate {
  coverColor: string;
}

export const initAlbumTemplate: AlbumTemplate[] = [
  {
    coverColor: '#863b3b',
  },
  {
    coverColor: '#47377d',
  },
  {
    coverColor: '#204e99',
  },
];

export interface CreateAlbumParamsType {
  name?: string;
  description?: string;
  coverColor?: string;
  coverUrl?: string;
}

export const initParamsType: CreateAlbumParamsType = {
  coverColor: initAlbumTemplate[0].coverColor,
  coverUrl: getBGThumbnail(initAlbumTemplate[0].coverColor),
};
