import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomStatusBar } from '@/components';
import { useUserStore } from '@/hooks';
import PushNotification from '@/notifications';
import RootNavigator from './root.navigator';
import { isReadyRef, navigationRef } from './navigation.service';

const AppContainer = (): React.ReactElement => {
  const { user } = useUserStore();

  useEffect(() => {
    if (user.user) {
      PushNotification.configure(user.user);
    }

    return () => {
      // @ts-ignore
      isReadyRef.current = false;
    };
  }, []);

  const onReadyNavigation = (): void => {
    // @ts-ignore
    isReadyRef.current = true;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} onReady={onReadyNavigation}>
        <CustomStatusBar darkBackground />
        <RootNavigator user={user.user} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
