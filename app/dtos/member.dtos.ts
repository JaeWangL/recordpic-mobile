import { AlbumPreviewDto } from './album.dtos';

export enum MemberRankType {
  Member = 0,
  Host = 1,
}

export interface MemberPreviewDto {
  id: number;
  userId: number;
  userEmail: string;
  userName: string;
  userImageUrl?: string;
  rank: MemberRankType;
}

export interface MemberWithAlbumDto {
  id: number;
  rank: MemberRankType;
  album: AlbumPreviewDto;
}

export interface CreateMemberRequest {
  albumCode?: string;
  albumId?: number;
  userId: number;
  userEmail: string;
  userName: string;
  userImageUrl?: string;
}

export interface DeleteMemberRequest {
  id: number;
}
