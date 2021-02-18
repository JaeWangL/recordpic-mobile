import { initAlbumTemplate } from '@/components/albumTemplateItem/interfaces';
import { getBGThumbnail } from '@/utils';

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
