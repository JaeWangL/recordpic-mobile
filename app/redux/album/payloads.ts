import { MemberWithAlbumDto } from '@/dtos';

export interface ChangeCurrentAlbumPayload {
  index: number;
}

export interface GetAlbumsFailedPayload {
  errorMsg: string;
}

export interface GetAlbumsSuccessPayload {
  members: MemberWithAlbumDto[];
}

export interface SetCurrentAlbumPayload {
  index: number;
}

export type Payload = GetAlbumsFailedPayload | GetAlbumsSuccessPayload | SetCurrentAlbumPayload;
