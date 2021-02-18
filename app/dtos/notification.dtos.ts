export enum NotificationType {
  CreateMember = 0,
  DeleteMember = 1,
  CreateMoment = 2,
  UpdateMoment = 3,
  CreateComment = 4,
}

export interface DeleteNotificationRequest {
  id: number;
}

export interface NotificationPreviewDto {
  id: number;
  type: NotificationType;
  memberName: string;
  memberImageUrl?: string;
  albumId?: number;
  momentId?: number;
  createdDate: Date;
}
