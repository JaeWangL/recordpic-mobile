import Analytics from '@react-native-firebase/analytics';
import Crashlytics from '@react-native-firebase/crashlytics';

export const logEventAsync = async (eventName: string, payload: { [key: string]: any }): Promise<void> => {
  await Analytics().logEvent(eventName, payload);
};

export default (e: any): void => {
  if (e instanceof Error && e.message !== 'Aborted' && !__DEV__) {
    Crashlytics().recordError(e);
  } else {
    console.log(e);
  }
};
