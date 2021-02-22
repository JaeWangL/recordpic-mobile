import { UpdatePhotoType } from '@/dtos';

export interface UpdateMomentParamsType {
  name?: string;
  momentDate: Date;
}

export interface UpdatePhotoParamsType {
  type: UpdatePhotoType;
  index: number;
  photoId?: number;
  photoUrl?: string;
  photoTitle?: string;
  photoDescription?: string;
}

export const initMParamsType: UpdateMomentParamsType = {
  momentDate: new Date(),
};

export const initPParamsType: UpdatePhotoParamsType[] = [];
