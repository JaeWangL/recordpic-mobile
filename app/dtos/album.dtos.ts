export interface AlbumPreviewDto {
  id: number;
  name: string;
  description?: string;
  coverColor: string;
  coverUrl: string;
  createdDate: Date;
}

export interface CreateAlbumRequest {
  userId: number;
  userEmail: string;
  userName: string;
  userImageUrl?: string;
  name: string;
  description: string;
  coverColor: string;
  coverUrl: string;
}

export interface DeleteAlbumRequest {
  id: number;
}

export interface UpdateAlbumRequest {
  id: number;
  name: string;
  description?: string;
  coverColor: string;
  coverUrl: string;
}
