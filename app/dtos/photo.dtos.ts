export interface PhotoPreviewDto {
  id: number;
  photoUrl: string;
  title: string;
  description: string;
}

export interface CreatePhotoRequest {
  albumId: number;
  momentId: number;
  photoUrl: string;
  title: string;
  description: string;
}

export interface CreatePhotoWithMomentRequest {
  photoUrl: string;
  title: string;
  description: string;
}

export interface DeletePhotoRequest {
  id: number;
}
