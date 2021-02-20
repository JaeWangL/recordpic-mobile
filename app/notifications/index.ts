import { AppState, Platform } from 'react-native';
import {
  NotificationBackgroundFetchResult,
  NotificationCompletion,
  Notifications,
  Registered,
} from 'react-native-notifications';
import { CreateDeviceRequest, DeviceTokenType, UserDto } from '@/dtos';
import { createDeviceAsync } from '@/services';
import { NotificationWithData } from './types';

class PushNotifications {
  user: UserDto | null = null;

  configured = false;

  constructor() {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerNotificationOpened(this.onNotificationOpened);
    Notifications.events().registerRemoteNotificationsRegistered(this.onRemoteNotificationsRegistered);
    Notifications.events().registerNotificationReceivedBackground(this.onNotificationReceivedBackground);
    Notifications.events().registerNotificationReceivedForeground(this.onNotificationReceivedForeground);
  }

  configure = async (user: UserDto): Promise<void> => {
    this.user = user;

    const notification: NotificationWithData | undefined = await Notifications.getInitialNotification();
    if (notification) {
      notification.userInteraction = true;
    }
  };

  handleNotification = (notification: NotificationWithData) => {
    Notifications.postLocalNotification(notification);
  };

  onNotificationOpened = (notification: NotificationWithData, completion: () => void) => {
    // eslint-disable-next-line no-param-reassign
    notification.userInteraction = true;
    this.handleNotification(notification);
    completion();
  };

  onRemoteNotificationsRegistered = (event: Registered) => {
    if (!this.configured && this.user) {
      const { deviceToken } = event;

      this.configured = true;

      const req: CreateDeviceRequest = {
        userId: this.user.id,
        type: Platform.OS === 'ios' ? DeviceTokenType.iOS : DeviceTokenType.Android,
        deviceToken,
      };
      createDeviceAsync(req, this.user.accessToken);
    }
  };

  onNotificationReceivedBackground = (
    notification: NotificationWithData,
    completion: (response: NotificationBackgroundFetchResult) => void,
  ) => {
    this.handleNotification(notification);
    completion(NotificationBackgroundFetchResult.NO_DATA);
  };

  onNotificationReceivedForeground = (
    notification: NotificationWithData,
    completion: (response: NotificationCompletion) => void,
  ) => {
    console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
    // eslint-disable-next-line no-param-reassign
    notification.foreground = AppState.currentState === 'active';
    completion({ alert: false, sound: true, badge: true });
    this.handleNotification(notification);
  };
}

export default new PushNotifications();
