import { CreatePhotoWithMomentRequest, UpdatePhotoWithMomentRequest } from './photo.dtos';

export interface MomentPreviewDto {
  id: number;
  name: string;
  coverUrl: string;
  momentDate: Date;
  photoCount: number;
}

export interface CreateMomentRequest {
  albumId: number;
  name: string;
  creatorMemberId: number;
  momentDate: Date;
  photos: CreatePhotoWithMomentRequest[];
}

export interface DeleteMomentRequest {
  id: number;
}

export interface UpdateMomentRequest {
  id: number;
  name: string;
  creatorMemberId: number;
  momentDate: Date;
  photos: UpdatePhotoWithMomentRequest[];
}
