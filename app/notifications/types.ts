import { Notification } from 'react-native-notifications';

export interface NotificationData {
  albumId?: string;
  momentId?: number;
}

export interface NotificationWithData extends Notification {
  payload: NotificationData;
  foreground?: boolean;
  userInteraction?: boolean;
}
