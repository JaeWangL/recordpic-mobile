export interface CommentPreviewDto {
  id: number;
  userId: number;
  userName: string;
  userImageUrl?: string;
  text: string;
  updatedAt: Date;
}

export interface CreateCommentRequest {
  albumId: number;
  momentId: number;
  userId: number;
  userName: string;
  userImageUrl?: string;
  text: string;
}

export interface DeleteCommentRequest {
  id: number;
}

export interface UpdateCommentRequest {
  id: number;
  text: string;
}
